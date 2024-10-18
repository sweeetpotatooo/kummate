// src/pages/RoomMate/board/board.tsx
import { useEffect, useState } from 'react'
import styles from './board.module.css'
import { Post, ArticlePageResultDto } from '../../../interface/interface' // ArticlePageResultDto 임포트
import PostModal from '../../../components/PostModal/postModal'
import MyPage from '../myPage'
import { API_URL, userMyArticles } from '../../../api'
import PostCard from '../../../components/PostCard/postCard'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import useFetch from '../../../hooks/useFetch'
import { Spin, Pagination } from 'antd'

const Board: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [totalCnt, setTotalCnt] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 10 // 페이지당 게시글 수
  const userToken = useSelector((state: RootState) => state.user.data.token)

  // 게시글 fetch 훅
  const {
    datas: boardData,
    isLoading: boardDataLoading,
    isSuccess: boardSuccess,
    error: boardError,
    setUrl: setBoardUrl,
    setHeaders: setBoardHeaders,
    setMethod: setBoardMethod,
    setBody: setBoardBody,
  } = useFetch<ArticlePageResultDto | null>("", "GET", {}, null) // ArticlePageResultDto 사용

  const handleBoard = (page: number = 1) => {
    setBoardUrl(`${API_URL}/api/${userMyArticles}?page=${page}&size=${pageSize}`)
    setBoardMethod("GET")
    setBoardHeaders(
      new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken.atk}`,
      }),
    )
    setBoardBody(null) // GET 요청에는 body가 필요 없으므로 null 설정
  }

  // 게시글 불러오기
  useEffect(() => {
    handleBoard(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (boardSuccess && boardData) {
      try {
        setPosts(boardData.articles) // articles 배열로 설정
        setTotalCnt(boardData.totalCnt) // totalCnt 설정
      } catch (error) {
        console.error(error)
      }
    }

    if (boardError) {
      console.error("게시글 불러오기 에러:", boardError)
    }
  }, [boardSuccess, boardData, boardError])

  // 게시글 모달창 닫기
  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <MyPage />
      <div className={styles.boardContainer}>
        {boardDataLoading ? (
          <Spin style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}/>
        ) : posts.length === 0 ? (
          <div className={styles.emptyBoard}>작성한 게시글이 없습니다</div>
        ) : (
          <>
            <div className={styles.cardGrid}>
              <PostCard posts={posts} />
            </div>
            {/* 페이지네이션 컴포넌트 추가 */}
            <div className={styles.paginationContainer}>
              <Pagination
                current={currentPage}
                onChange={handlePageChange}
                total={totalCnt}
                pageSize={pageSize}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
        {selectedPost && (
          <PostModal post={selectedPost} onClose={handleCloseModal} />
        )}
      </div>
    </>
  )
}

export default Board
