/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/MyPage/Applicant/applicant.tsx
import styles from "./applicant.module.css"
import { Badge, Card, Button, Spin, message } from "antd"
import Meta from "antd/es/card/Meta"
import {
  ApplicantProps,
  ApplyProps,
  Post,
  User,
} from "../../../interface/interface"
import { useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../../Redux/store"
import { useEffect, useState, useCallback } from "react"
import OtherUserProfile from "./otherUserProfile"
import { useDispatch } from "react-redux"
import {
  approvePostAsync,
  deletePostAsync,
  refusePostAsync,
} from "../../../Redux/applicantReducer"
import { fetchData } from "../../../Redux/applyReducer"
import { useNavigate } from "react-router-dom"
import { API_URL, usersProfile } from "../../../api"
import PostModal from "../../../components/PostModal/postModal"
import { useApply } from "../../../components/Apply/applyApi" // 경로 확인

const Applicant: React.FC<ApplicantProps> = ({
  showApply,
  post,
  currentPage,
}) => {
  const userToken = useSelector((state: RootState) => state.user.data.token)
  const [otherUser, setOtherUser] = useState<User | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Post | null>(null)
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  // 신청 상태와 toggle 함수 받기
  const [isSaved, toggleApply] = useApply(post.articleId, post.applyId)

  // ㅅ또는 취소하기 버튼 클릭 핸들러
  const handleApplyClick = useCallback(async () => {
    try {
      await toggleApply()
      if (isSaved) {
        message.success("신청이 취소되었습니다.")
      } else {
        message.success("신청이 완료되었습니다.")
      }
    } catch (error) {
      console.error(error)
      message.error("신청 처리에 실패했습니다.")
    }
  }, [toggleApply, isSaved])

  // 승인
  const handleApprovePost = async (post: ApplyProps) => {
    try {
      await dispatch(
        approvePostAsync({
          userToken: userToken.atk.toString(),
          otherUserId: post.otherUserId,
          articleId: post.articleId,
        }),
      ).unwrap()
      dispatch(
        fetchData({
          showApply: true,
          currentPage: 1,
          userToken: userToken.atk.toString(),
        }),
      )
      message.success("신청이 승인되었습니다.")
    } catch (error) {
      console.error(error)
      message.error("신청 승인에 실패했습니다.")
    }
  }

  // 거절
  const handleRefusePost = async (post: ApplyProps) => {
    try {
      await dispatch(
        refusePostAsync({
          userToken: userToken.atk.toString(),
          applyId: post.applyId,
          articleId: post.articleId,
        }),
      ).unwrap()
      dispatch(
        fetchData({
          showApply: true,
          currentPage: 1,
          userToken: userToken.atk.toString(),
        }),
      )
      message.success("신청이 거절되었습니다.")
    } catch (error) {
      console.error(error)
      message.error("신청 거절에 실패했습니다.")
    }
  }

  // 삭제
  const handleDeletePost = async (applyId: number) => {
    try {
      await dispatch(
        deletePostAsync({
          userToken: userToken.atk.toString(),
          applyId: applyId,
        }),
      ).unwrap()
      dispatch(
        fetchData({
          showApply: showApply,
          currentPage: currentPage,
          userToken: userToken.atk.toString(),
        }),
      )
      message.success("신청이 삭제되었습니다.")
    } catch (error) {
      console.error(error)
      message.error("신청 삭제에 실패했습니다.")
    }
  }

  // 프로필 로딩 상태 관리
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [loadingArticle, setLoadingArticle] = useState(false)

  // 프로필 호출
  const handleUserProfile = (userId: number) => {
    setLoadingProfile(true);
    fetch(`${API_URL}/${usersProfile}/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken.atk}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('프로필을 가져오는데 실패했습니다.');
        }
        return response.json();
      })
      .then(data => {
        setOtherUser(data.data);
        setIsModalVisible(true);
      })
      .catch(error => {
        console.error(error);
        message.error('프로필을 불러오는 데 실패했습니다.');
      })
      .finally(() => {
        setLoadingProfile(false);
      });
  };

  // 게시글 호출
  const handleArticleClick = (articleId: string) => {
    setLoadingArticle(true)
    fetch(`${API_URL}/api/articles/${articleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken.atk}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("게시글을 가져오는데 실패했습니다.")
        }
        return response.json()
      })
      .then(data => {
        setSelectedArticle(data.data)
      })
      .catch(error => {
        console.error(error)
        message.error("게시글을 불러오는 데 실패했습니다.")
      })
      .finally(() => {
        setLoadingArticle(false)
      })
  }

  return (
    <>
      {!showApply ? (
        <div key={`notApply-${post.applyId}`}>
          <Card
            cover={<Badge.Ribbon text={post.matchStatus} color="orange" />}
            className={styles.cardContainer}
            actions={[
              <p onClick={() => handleUserProfile(post.otherUserId)}>프로필</p>,
              <p onClick={() => handleApprovePost(post)}>승인</p>,
              <p onClick={() => handleRefusePost(post)}>거절</p>,
            ]}
          >
            <Meta
              title={`'${post.otherUserName}'님이 룸메이트 신청을 하였습니다.`}
              description={`'${post.articleTitle}' 게시물에 신청이 도착했습니다`}
            />
          </Card>
        </div>
      ) : (
        <div key={`apply-${post.applyId}`}>
          <Card
            cover={<Badge.Ribbon text={post.matchStatus} color="orange" />}
            className={styles.cardContainer}
            actions={[
              <p onClick={() => handleUserProfile(post.otherUserId)}>프로필</p>,
              <p onClick={() => handleArticleClick(post.articleId.toString())}>
                게시물
              </p>,
            ]}
          >
            <Meta
              title={`'${post.articleTitle}' 게시물에 룸메이트 신청을 하였습니다.`}
              description="룸메이트 매칭 결과를 기다리세요"
            />
            <button
              className={
                isSaved ? `${styles.apply} ${styles.applyActive}` : styles.apply
              }
              style={{ float: "right", marginTop: '10px' }}
              onClick={handleApplyClick}
            >
              {isSaved ? "신청 취소" : "신청하기"}
            </button>
          </Card>
        </div>
      )}

      {otherUser && (
        <OtherUserProfile
          userProfile={otherUser}
          visible={isModalVisible}
          onClose={() => setOtherUser(null)}
        />
      )}
      {selectedArticle && (
        <PostModal
          post={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  )
}

export default Applicant