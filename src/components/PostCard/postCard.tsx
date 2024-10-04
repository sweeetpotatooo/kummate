// src/components/PostCard/postCard.tsx
import React, { useState } from "react"
import { UserOutlined } from "@ant-design/icons"
import styles from "./postCard.module.css"
import { Badge, Card, message } from "antd"
import PostModal from "../PostModal/postModal"
import { Post } from "../../interface/interface"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"

interface PostCardProps {
  posts: Post[]
}

const PostCard: React.FC<PostCardProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const isLogged = useSelector((state: RootState) =>
    Boolean(state.user.data.token.atk)
  )

  const recruit = (recruiting: boolean) => {
    return recruiting ? "모집" : "마감"
  }

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handlePostClick = (post: Post) => {
    if (isLogged) {
      setSelectedPost(post)
    } else {
      messageApi.error("로그인이 필요합니다.")
    }
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  const decodeHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }

  // 데이터 확인을 위한 로그 추가
  console.log("Rendering PostCard with posts:", posts)

  return (
    <>
      {posts.length === 0 ? (
        <div className={styles.noPosts}>게시글이 없습니다.</div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className={styles.cardContainer}
            onClick={() => handlePostClick(post)}
          >
            {post.isRecruiting ? (
              <Badge.Ribbon text={recruit(post.isRecruiting)}>
                <Card style={{ width: 250, marginTop: 16 }}>
                  <div className={styles.cardText}>
                    <span className={styles.cardTitle}>{post.title}</span>
                    <span className={styles.cardContent}>
                      {decodeHTML(post.content)}
                    </span>
                  </div>
                  <div className={styles.user}>
                    <div className={styles.author}>
                      <span>{post.nickname}</span>
                      {post.gender === "여자" ? (
                        <UserOutlined style={{ color: "#ff0000" }} />
                      ) : (
                        <UserOutlined style={{ color: "#2858FF" }} />
                      )}
                    </div>
                    <span>{formatDate(post.createDate)}</span>
                  </div>
                  <div className={styles.cardBadgeContainer}>
                    <Badge className={styles.cardBadgeArea}>
                      {post.region}
                    </Badge>
                    <Badge className={styles.cardBadgeAgeGroup}>
                      {post.ageGroup}
                    </Badge>
                    <Badge className={styles.cardBadgeSmoke}>
                      {post.smoke ? "흡연" : "비흡연"}
                    </Badge>
                  </div>
                </Card>
              </Badge.Ribbon>
            ) : (
              <Badge.Ribbon
                text={recruit(post.isRecruiting)}
                style={{ background: "#8a8a8a", color: "#8a8a8a" }}
              >
                <Card style={{ width: 250, marginTop: 16 }}>
                  <div className={styles.cardText}>
                    <span className={styles.cardTitle}>{post.title}</span>
                    <span className={styles.cardContent}>
                      {decodeHTML(post.content)}
                    </span>
                  </div>
                  <div className={styles.user}>
                    <div className={styles.author}>
                      <span>{post.nickname}</span>
                      {post.gender === "여자" ? (
                        <UserOutlined style={{ color: "#ff0000" }} />
                      ) : (
                        <UserOutlined style={{ color: "#2858FF" }} />
                      )}
                    </div>
                    <span>{formatDate(post.createDate)}</span>
                  </div>
                  <div className={styles.cardBadgeContainer}>
                    <Badge className={styles.cardBadgeArea}>
                      {post.region}
                    </Badge>
                    <Badge className={styles.cardBadgeAgeGroup}>
                      {post.ageGroup}
                    </Badge>
                    <Badge className={styles.cardBadgeSmoke}>
                      {post.smoke ? "흡연" : "비흡연"}
                    </Badge>
                  </div>
                </Card>
              </Badge.Ribbon>
            )}
          </div>
        ))
      )}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}
      {contextHolder}
    </>
  )
}

export default PostCard
