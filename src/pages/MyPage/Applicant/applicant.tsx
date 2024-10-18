// src/pages/MyPage/Applicant/applicant.tsx

import styles from "./applicant.module.css"
import { Badge, Card } from "antd"
import Meta from "antd/es/card/Meta"
import {
  ApplicantProps,
  ApplyProps,
  Post,
  User,
} from "../../../interface/interface"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../../Redux/store"
import { API_URL, usersProfile, userChatRoom } from "../../../api"
import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import PostModal from "../../../components/PostModal/postModal"
import OtherUserProfile from "./otherUserProfile"
import {
  approvePostAsync,
  deletePostAsync,
  refusePostAsync,
} from "../../../Redux/applicantReducer"
import { fetchData } from "../../../Redux/applyReducer"
import { useNavigate } from "react-router-dom"

const Applicant: React.FC<ApplicantProps> = ({
  showApply,
  post,
  currentPage,
}) => {
  const userToken = useSelector((state: RootState) => state.user.data.token)
  const [otheruser, setOtherUser] = useState<User | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Post | null>(null)
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  // 승인
  const handleApprovePost = async (post: ApplyProps) => {
    await dispatch(
      approvePostAsync({
        userToken: userToken.atk.toString(),
        otherUserId: post.otherUserId,
        articleId: post.articleId,
      }),
    )
    dispatch(
      fetchData({
        showApply: showApply,
        currentPage: currentPage,
        userToken: userToken.atk.toString(),
      }),
    )
  }

  // 거절
  const handleRefusePost = async (post: ApplyProps) => {
    await dispatch(
      refusePostAsync({
        userToken: userToken.atk.toString(),
        applyId: post.applyId,
        articleId: post.articleId,
      }),
    )
    dispatch(
      fetchData({
        showApply: showApply,
        currentPage: currentPage,
        userToken: userToken.atk.toString(),
      }),
    )
  }

  // 삭제
  const handleDeletePost = async (applyId: number) => {
    await dispatch(
      deletePostAsync({
        userToken: userToken.atk.toString(),
        applyId: applyId,
      }),
    )
    dispatch(
      fetchData({
        showApply: showApply,
        currentPage: currentPage,
        userToken: userToken.atk.toString(),
      }),
    )
  }

  // 프로필
  const {
    datas: profileDatas,
    isSuccess: profileSuccess,
    setUrl: setProfileDatasUrl,
    setHeaders: setProfileHeaders,
    setMethod: setProfileMethod,
    setBody: setProfileBody,
  } = useFetch<{ data: User } | null>("", "GET", {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken.atk}`,
  }, null)

  const handleUserProfile = (userId: number) => {
    try {
      setProfileDatasUrl(`${API_URL}/${usersProfile}/${userId}`)
      setProfileMethod("GET")
      setProfileHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken.atk}`,
      })
      setProfileBody(null)
    } catch (error) {
      console.error(error)
    }
  }

  // 프로필 호출
  useEffect(() => {
    if (profileSuccess && profileDatas) {
      try {
        console.log("Profile Data:", profileDatas)
        setOtherUser(profileDatas.data)
        setIsModalVisible(true)
      } catch (error) {
        console.error(error)
      }
    }
  }, [profileSuccess, profileDatas])

  // 게시글
  const {
    datas: articleData,
    isSuccess: articleSuccess,
    setUrl: setArticleUrl,
    setHeaders: setArticleHeaders,
    setMethod: setArticleMethod,
    setBody: setArticleBody,
  } = useFetch<{ data: Post } | null>("", "GET", {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken.atk}`,
  }, null)

  const handleArticleClick = (articleId: string) => {
    try {
      setArticleUrl(`${API_URL}/api/articles/${articleId}`)
      setArticleMethod("GET")
      setArticleHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken.atk}`,
      })
      setArticleBody(null)
    } catch (error) {
      console.error(error)
    }
  }

  // 게시글 호출
  useEffect(() => {
    if (articleSuccess && articleData) {
      try {
        console.log("Article Data:", articleData)
        setSelectedArticle(articleData.data)
      } catch (error) {
        console.error(error)
      }
    }
  }, [articleSuccess, articleData])

  // 채팅방 생성
  const {
    isSuccess: chatSuccess,
    setUrl: setChatUrl,
    setHeaders: setChatHeaders,
    setMethod: setChatMethod,
    setBody: setChatBody,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useFetch<any>("", "POST", {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken.atk}`
  }, null)

  const handleChatClick = (applyId: number) => {
    try {
      setChatUrl(`${API_URL}/api/${userChatRoom}/${applyId}`)
      setChatMethod("POST")
      setChatHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken.atk}`
      })
      setChatBody({}) // 실제로 필요한 데이터가 있다면 여기에 추가
    } catch (error) {
      console.error(error)
    }
  }

  // 채팅방 가기
  useEffect(() => {
    if (chatSuccess) {
      try {
        navigate("/chat")
      } catch (error) {
        console.error(error)
      }
    }
  }, [chatSuccess, navigate])

  return (
    <>
      {!showApply ? (
        post.matchStatus === "대기" ? (
          <div key={post.applyId}>
            <Card
              cover={<Badge.Ribbon text={post.matchStatus} />}
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
              <div>
                <p className={styles.content}></p>
              </div>
            </Card>
          </div>
        ) : post.matchStatus === "거절" ? (
          <div key={post.applyId}>
            <Card
              cover={<Badge.Ribbon text={post.matchStatus} />}
              className={styles.cardContainer}
              actions={[
                <p onClick={() => handleDeletePost(post.applyId)}>삭제</p>,
              ]}
            >
              <Meta
                title={`'${post.otherUserName}'님의 룸메이트 매칭을 거절 하였습니다.`}
                description="다른 룸메이트를 구해보세요"
              />
              <div>
                <p className={styles.content}></p>
              </div>
            </Card>
          </div>
        ) : post.matchStatus === "승인" ? (
          <div key={post.applyId}>
            <Card
              cover={<Badge.Ribbon text={post.matchStatus} />}
              className={styles.cardContainer}
              actions={[
                <p onClick={() => handleChatClick(post.applyId)}>
                  채팅방 만들기
                </p>,
                <p onClick={() => handleUserProfile(post.otherUserId)}>프로필</p>,
              ]}
            >
              <Meta
                title={`'${post.articleTitle}' 게시물에 '${post.otherUserName}'님과 룸메이트 매칭이 되었습니다.`}
                description="1:1 채팅으로 원활한 대화를 나눠보세요"
              />
              <div>
                <p className={styles.content}></p>
              </div>
            </Card>
          </div>
        ) : null
      ) : post.matchStatus === "대기" ? (
        <div key={post.applyId}>
          <Card
            cover={<Badge.Ribbon text={post.matchStatus} />}
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
            <div>
              <p className={styles.content}></p>
            </div>
          </Card>
        </div>
      ) : post.matchStatus === "거절" ? (
        <div key={post.applyId}>
          <Card
            cover={<Badge.Ribbon text={post.matchStatus} />}
            className={styles.cardContainer}
            actions={[
              <p onClick={() => handleDeletePost(post.applyId)}>삭제</p>,
            ]}
          >
            <Meta
              title={`'${post.articleTitle}' 게시물 룸메이트 매칭이 거절 되었습니다.`}
              description="아쉽네요. 다른 룸메이트를 구해보세요"
            />
            <div>
              <p className={styles.content}></p>
            </div>
          </Card>
        </div>
      ) : post.matchStatus === "승인" ? (
        <Card
          cover={<Badge.Ribbon text={post.matchStatus} />}
          className={styles.cardContainer}
          actions={[
            <p onClick={() => handleChatClick(post.applyId)}>채팅방 만들기</p>,
            <p onClick={() => handleUserProfile(post.otherUserId)}>프로필</p>,
          ]}
        >
          <Meta
            title={`'${post.articleTitle}' 게시물에 '${post.otherUserName}'님과 룸메이트 매칭이 되었습니다.`}
            description="1:1 채팅으로 원활한 대화를 나눠보세요"
          />
          <div>
            <p className={styles.content}></p>
          </div>
        </Card>
      ) : null}
      {otheruser && (
        <OtherUserProfile
          userProfile={otheruser}
          visible={isModalVisible}
          onClose={() => setOtherUser(null)}
        />
      )}
      {selectedArticle && (
        <PostModal
          visible={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          post={selectedArticle}
        />
      )}
    </>
  )
}

export default Applicant
