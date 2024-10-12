import React from "react";
import styles from "./recommendCard.module.css";
import { Badge, Card, Button } from "antd";
import { RecommendProps } from "../../interface/interface";

const RecommendCard: React.FC<RecommendProps> = ({ user, onClick }) => {
  return (
    <div onClick={onClick} className={styles.cardContainer}>
      <Badge.Ribbon text="추천">
        <Card style={{ width: 250, marginTop: 16 }}>
          <div className={styles.cardText}>
            <span className={styles.cardTitle}>{user.nickname}</span>
          </div>
          <div className={styles.date}>
            {user.nickname}님과 프로필이 비슷한
            <br />
            룸메이트입니다!
            <br /> 확인해보세요 ~
          </div>
          <div className={styles.cardBadgeContainer}>
            <Button className={styles.cardBadgeSmoke} type="primary">
              프로필 보기
            </Button>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default RecommendCard;
