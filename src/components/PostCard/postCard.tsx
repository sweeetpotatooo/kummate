// src/components/PostCard/PostCard.tsx
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
  onPostClick?: (post: Post) => void  // Optional onPostClick prop
}

const PostCard: React.FC<PostCardProps> = ({ posts, onPostClick }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const isLogged = useSelector((state: RootState) =>
    Boolean(state.user.data.token.atk)
  )

  const handlePostClick = (post: Post) => {
    if (isLogged) {
      if (onPostClick) {
        onPostClick(post)
      } else {
        setSelectedPost(post)
      }
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

  return (
    <>
      {posts.length === 0 ? (
        <div className={styles.noPosts}>게시글이 없습니다.</div>
      ) : (
        <div className={styles.postCardGrid}>
          {posts.map((post) => (
            <div
              key={post.id}
              className={styles.postCardContainer}
              onClick={() => handlePostClick(post)}
            >
              {post.isRecruiting ? (
                <Badge.Ribbon text="모집" color="#4b7a47">
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
                      <span>{new Date(post.createDate).toLocaleDateString()}</span>
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
                  text="마감"
                  color="gray"
                  style={{ background: "#8a8a8a", color: "#ffffff" }}
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
                      <span>{new Date(post.createDate).toLocaleDateString()}</span>
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
          ))}
        </div>
      )}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={handleCloseModal}
        />
      )}
      {contextHolder}
    </>
  )
}

export default PostCard
