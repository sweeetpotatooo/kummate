// src/pages/MyPage/Applicant/apply.tsx
import { RedoOutlined } from '@ant-design/icons'
import styles from './applicant.module.css'
import { Button, Pagination, Spin, message } from 'antd'
import { useEffect, useState } from 'react'
import Applicant from './applicant'
import MyPage from '../myPage'
import { useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../../Redux/store'
import { useDispatch } from 'react-redux'
import { fetchData } from '../../../Redux/applyReducer'

const Apply: React.FC = () => {
  const userToken = useSelector((state : RootState) => state.user.data.token)
  const [showApply, setShowApply] = useState(false)
  const [toCurrentPage, setToCurrentPage] = useState(1)
  const [fromCurrentPage, setFromCurrentPage] = useState(1)
  const pageSize = 3
  const dispatch: AppDispatch = useDispatch()
  const { applyPosts, totalCount, loading, error } = useSelector((state: RootState) => state.apply)

  // '신청 했어요' '신청 받았어요'
  const toggleShowApply = () => {
    setShowApply(!showApply)
  }

  // 새로고침
  const refresh = () => {
    dispatch(fetchData({ 
      showApply: showApply, 
      currentPage: showApply ? toCurrentPage : fromCurrentPage, 
      userToken: userToken.atk.toString()
    }))
    message.success("신청 현황이 새로고침되었습니다.")
  }

  // '신청 했어요' 페이지네이션
  const handleToPageChange = (page: number) => {
    setToCurrentPage(page)
  }

  // '신청 받았어요' 페이지네이션
  const handleFromPageChange = (page: number) => {
    setFromCurrentPage(page)
  }

  // 신청현황 불러오기
  useEffect(() => {
    dispatch(fetchData({ 
      showApply: showApply, 
      currentPage: showApply ? toCurrentPage : fromCurrentPage, 
      userToken: userToken.atk.toString()
    }))
  }, [dispatch, toCurrentPage, fromCurrentPage, showApply, userToken])

  // 에러 처리
  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  return (
    <>
      <MyPage />
      <div className={styles.applyContainer}>
        <div className={styles.applyTitle}>
          {showApply ? <h3>신청한 현황</h3> : <h3>신청 받은 현황</h3>}
          <div className={styles.applyBtn}>
            <Button className={styles.circleBtn} shape="circle" onClick={refresh}>
              <RedoOutlined />
            </Button>
            <Button style={{ width: 90, display: 'flex', justifyContent: 'center' }} onClick={toggleShowApply}>
              {showApply ? "내가 받은 신청" : "내가한 신청"}
            </Button>
          </div>
        </div>
        <div className={styles.applicantContainer}>
          {loading ? (
            <Spin tip="Loading..." />
          ) : applyPosts.length === 0 ? (
            <p className={styles.applyPostsP}>신청현황이 없습니다</p>
          ) : (
            applyPosts.map((post) => (
              <div key={post.applyId}>
                <Applicant
                  post={post}
                  currentPage={showApply ? toCurrentPage : fromCurrentPage}
                  showApply={showApply} />
              </div>
            ))
          )}
          {showApply ? (
            <Pagination 
              className={styles.pagination}
              current={toCurrentPage}
              onChange={handleToPageChange}
              total={totalCount}
              pageSize={pageSize} />
          ) : (
            <Pagination 
              className={styles.pagination}
              current={fromCurrentPage}
              onChange={handleFromPageChange}
              total={totalCount}
              pageSize={pageSize} />
          )}
        </div>
      </div>
    </>
  )
}

export default Apply
