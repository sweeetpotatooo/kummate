//src/components/MainPostCard/mainPostCard.tsx
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import styles from "./mainpostCard.module.css";
import { Badge, Card } from "antd";
import { Post } from "../../interface/interface";
interface MainPostCardProps {
  readonly post: Post;
  readonly onClick: () => void;
}

const MainPostCard: React.FC<MainPostCardProps> = ({ post, onClick }) => {
  const formatDate = (dateString: string): string => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <Badge.Ribbon text="모집">
        <Card style={{ width: 250, marginTop: 16 }}>
          <div className={styles.cardText}>
            <span className={styles.cardTitle}>{post.title}</span>
          </div>
          <div className={styles.author}>
            <span>{post.nickname}</span>
            {post.gender === "여자" ? (
              <UserOutlined style={{ color: "#ff0000" }} />
            ) : (
              <UserOutlined style={{ color: "#2858FF" }} />
            )}
          </div>
          <div className={styles.date}>
            {post.createDate ? formatDate(post.createDate) : "N/A"}
          </div>
          <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
            <Badge className={styles.cardBadgeAgeGroup}>{post.ageGroup}</Badge>
            <Badge className={styles.cardBadgeSmoke}>{post.smoke} {post.smoke ? "흡연" : "비흡연"}</Badge>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default MainPostCard;
