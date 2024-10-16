// Favorite.tsx

import { useEffect, useState } from 'react'
import MyPage from '../myPage'
import styles from './favorite.module.css'
import { Post } from '../../../interface/interface'
import PostModal from '../../../components/PostModal/postModal'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../Redux/store'
import PostCard from '../../../components/PostCard/postCard'
import { useDispatch } from 'react-redux'
import { fetchFavorites } from '../../../components/Favorite/favoritesThunk'

const Favorite = () => {
  const dispatch: AppDispatch = useDispatch()
  
  // Redux 상태에서 favorites 데이터를 올바르게 선택
  const favorites = useSelector((state: RootState) => state.favorites)
  
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  const favoritesState = useSelector((state: RootState) => state.favorites);
  console.log('favoritesState:', favoritesState);
  
  // 찜한 목록 가져오기
  useEffect(() => {
    dispatch(fetchFavorites())
  }, [dispatch])
  
  return(
    <>
      <MyPage />
      <div className={styles.favoriteContainer}>
        {
          favorites && favorites.length === 0 ? (
            <div className={styles.emptyFavorites}>
              관심 있는 게시글을 담아보세요
            </div>
          ) : (
            <div className={styles.cardGrid}>
              <PostCard posts={favorites} onPostClick={setSelectedPost}/>
            </div>
          )
        }
        {selectedPost && (
          <PostModal
            post={selectedPost} onClose={handleCloseModal} />
        )}
      </div>
    </>
  )
}

export default Favorite
