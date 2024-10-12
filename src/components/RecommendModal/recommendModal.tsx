// RecommendModal.tsx
import React, { useState, useEffect } from "react";
import { Button, Input, List, Modal, Radio, message } from "antd";
import styles from "./recommendModal.module.css";
import { RecommendModalProps } from "../../interface/interface";
import { userArticle } from "../../api";
import { Post } from "../../interface/interface";
import PostModal from "../PostModal/postModal";

const RecommendModal: React.FC<RecommendModalProps> = ({
  visible,
  onClose,
  userProfile,
  user,
}) => {
  const [checkedGender, setCheckedGender] = useState<string>("");
  const [checkedSmoking, setCheckedSmoking] = useState<string>("");
  const [userArticles, setUserArticles] = useState<Post[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Post | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userProfile) {
          setCheckedGender(userProfile.gender);
          setCheckedSmoking(userProfile.isSmoker ? "흡연" : "비흡연");

          const response = await fetch(`/api/${userArticle}/users/${user?.id}`);
          if (!response.ok) {
            throw new Error("게시글을 불러오는데 실패했습니다.");
          }
          const data = await response.json();
          setUserArticles(data.data);
        }
      } catch (error) {
        console.error("Error:", error);
        message.error("추천 유저의 게시글을 불러오는데 실패했습니다.");
      }
    };

    if (visible) {
      fetchData();
    }
  }, [visible, userProfile, user, userArticle]);

  const smokingOptions = [
    { label: "흡연", value: "흡연" },
    { label: "비흡연", value: "비흡연" },
  ];

  const genderOptions = [
    { label: "여성", value: "여성" },
    { label: "남성", value: "남성" },
  ];

  const handleArticleClick = async (articleId: string) => {
    try {
      const response = await fetch(`/api/articles/${articleId}`);
      if (!response.ok) {
        throw new Error("게시글을 불러오는데 실패했습니다.");
      }
      const data = await response.json();
      setSelectedArticle(data.data); // API 응답 형식에 맞게 수정
    } catch (error) {
      console.error("Error fetching article:", error);
      message.error("게시글을 불러오는데 실패했습니다.");
    }
  };

  return (
    <>
      <Modal
        centered
        open={visible}
        onOk={onClose}
        onCancel={onClose}
        closeIcon={null}
        footer={[
          <Button key="submit" type="primary" onClick={onClose}>
            닫기
          </Button>,
        ]}
      >
        <div className={styles.profileTitle}>
          <span>
            <span className={styles.userProfileNickname}>
              {userProfile?.nickname}
            </span>{" "}
            님의 프로필
          </span>
        </div>
        <div className={styles.profileBox}>
          <div className={`${styles.profileSection} ${styles.profileSection2Col}`}>
            <span>성별</span>
            <Radio.Group
              options={genderOptions}
              value={checkedGender}
              optionType="button"
              disabled
            />
          </div>
          <div className={`${styles.profileSection} ${styles.profileSection2Col}`}>
            <span>흡연</span>
            <Radio.Group
              options={smokingOptions}
              value={checkedSmoking}
              optionType="button"
              disabled
            />
          </div>
          <div className={styles.profileSection}>
            <span>활동시간</span>
            <Input
              value={userProfile?.activityTime}
              style={{ width: 100 }}
              readOnly
            />
          </div>
          <div className={`${styles.profileSection} ${styles.profileSection4Col}`}>
            <span>학과</span>
            <Input value={userProfile?.department} style={{ width: 100 }} readOnly />
          </div>
          <div className={`${styles.profileSection} ${styles.profileSection4Col}`}>
            <span>MBTI</span>
            <Input value={userProfile?.mbti} style={{ width: 100 }} readOnly />
          </div>
          <div className={`${styles.profileSection} ${styles.profileSection4Col}`}>
            <span>기숙사</span>
            <Input value={userProfile?.region} style={{ width: 120 }} readOnly />
          </div>
          <div className={`${styles.profileSection} ${styles.profileSection4Col}`}>
            <span>연령</span>
            <Input value={userProfile?.age} style={{ width: 60 }} readOnly />
          </div>
          <div className={`${styles.profileSection} ${styles.profileSection4Col}`}>
            <span>본인 소개</span>
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 5 }}
              value={userProfile?.detail}
              style={{
                maxWidth: 472,
                overflowWrap: "break-word",
                wordWrap: "break-word",
              }}
              readOnly
            />
          </div>
          <div className={styles.postsSection}>
            <span className={styles.postsCreated}>
              {userProfile?.nickname}님이 작성한 게시글
            </span>
            <List
              bordered
              dataSource={userArticles}
              renderItem={(article) => (
                <List.Item>
                  <a
                    onClick={() => handleArticleClick(article.id.toString())}
                    className={styles.articleTitle}
                  >
                    {article.title}
                  </a>
                </List.Item>
              )}
            />
          </div>
        </div>
      </Modal>
      {selectedArticle && (
        <PostModal
          visible={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          post={selectedArticle}
        />
      )}
    </>
  );
};

export default RecommendModal;
