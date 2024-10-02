import { UserOutlined } from "@ant-design/icons";
import styles from "./postcard2.module.css";
import { Badge, Card } from "antd";
import { RoomMateSearchProps } from "../interface/interface";

// MainPostCard 컴포넌트 정의
// RoomMateSearchProps 타입을 사용하여 post 데이터와 onClick 핸들러를 받음
const MainPostCard: React.FC<RoomMateSearchProps> = ({ post, onClick }) => {

  // 날짜 포맷팅 함수
  // dateString을 받아 "년-월-일" 형식으로 변환하여 반환
  const formatDate = (dateString: string): string => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    // 카드 컨테이너
    <div className={styles.cardContainer} onClick={onClick}>
      {/* "모집" 리본 배지 */}
      <Badge.Ribbon text="모집">
        {/* 안트 디자인 카드 컴포넌트 사용 */}
        <Card style={{ width: 250, marginTop: 16 }}>
          {/* 카드 제목 */}
          <div className={styles.cardText}>
            <span className={styles.cardTitle}>{post?.title}</span>
          </div>

          {/* 작성자 정보 */}
          <div className={styles.author}>
            <span>{post?.nickname}</span>
            {/* 성별에 따라 아이콘 색상을 다르게 표시 */}
            {post?.gender === "여성" ? (
              <UserOutlined style={{ color: "#ff0000" }} />
            ) : (
              <UserOutlined style={{ color: "#2858FF" }} />
            )}
          </div>

          {/* 생성 날짜 */}
          <div className={styles.date}>
            {post?.createdDate ? formatDate(post.createdDate) : "N/A"}
          </div>

          {/* 배지들을 담는 컨테이너 */}
          <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgeArea}>{post?.region}</Badge>
            <Badge className={styles.cardBadgeAgeGroup}>{post?.ageGroup}</Badge>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default MainPostCard;
