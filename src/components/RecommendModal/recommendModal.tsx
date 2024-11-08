// RecommendModal.tsx

import React, { useState, useEffect } from "react";
import { Button, Input, List, Modal, Radio, message, Spin } from "antd";
import styles from "./recommendModal.module.css";
import { RecommendModalProps, Post } from "../../interface/interface"; // Post 인터페이스 포함
import { API_URL, userArticle } from "../../api";
import PostModal from "../PostModal/postModal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

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

  const userToken = useSelector((state: RootState) => state.user.data.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userProfile && user) {
          setCheckedGender(userProfile.gender);
          setCheckedSmoking(userProfile.isSmoker ? "흡연" : "비흡연");

          const response = await fetch(`${API_URL}/api/${userArticle}/users/${user.user_id}`, {
            headers: {
              Authorization: `Bearer ${userToken.atk}`, // 토큰 포함
              "Content-Type": "application/json",
            },
          });
          console.log("Fetch response status:", response.status);
          if (!response.ok) {
            throw new Error("게시글을 불러오는데 실패했습니다.");
          }
          const data = await response.json();
          console.log("Fetched data:", data);
          setUserArticles(data.data.articles || []);
        }
      } catch (error) {
        console.error("Error:", error);
        message.error("추천 유저의 게시글을 불러오는데 실패했습니다.");
      }
    };

    if (visible) {
      fetchData();
    }
  }, [visible, userProfile, user, userArticle, userToken]);

  const smokingOptions = [
    { label: "흡연", value: "흡연" },
    { label: "비흡연", value: "비흡연" },
  ];

  const genderOptions = [
    { label: "여자", value: "여자" },
    { label: "남자", value: "남자" },
  ];

  const handleArticleClick = async (articleId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/articles/${articleId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
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

  // 로딩 상태 처리
  if (!userProfile) {
    return (
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
        <Spin />
      </Modal>
    );
  }

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
        width={600} // 모달 너비 조정 (필요시 변경)
      >
        <div className={styles.profileTitle}>
          <span>
            <span className={styles.userProfileNickname}>
              {userProfile.nickname}
            </span>{" "}
            님의 프로필
          </span>
        </div>
        <div className={styles.profileBox}>

          <div className={styles.profileRow}>
            <div className={styles.profileSection}>
              <span>성별</span>
              <Radio.Group
                options={genderOptions}
                value={checkedGender}
                optionType="button"
                className={styles.customGenderRadioGroup}
              />
            </div>
            <div className={styles.profileSection}>
              <span>흡연</span>
              <Radio.Group
                options={smokingOptions}
                value={checkedSmoking}
                optionType="button"
                className={styles.customSmokingRadioGroup}
              />
            </div>
          </div>


          <div className={styles.profileRow}>
            <div className={styles.profileSection}>
              <span>학과</span>
              <Input
                value={userProfile.department}
                style={{ width: 150 }}
                readOnly
              />
            </div>
            <div className={styles.profileSection}>
              <span>나이</span>
              <Input
                value={userProfile.age}
                style={{ width: 60 }}
                readOnly
              />
            </div>
          </div>

          {/* 세 번째 줄: 기숙사, 활동시간, MBTI */}
          <div className={styles.profileRow}>
            <div className={styles.profileSection}>
              <span>기숙사</span>
              <Input
                value={userProfile.region}
                style={{ width: 120 }}
                readOnly
              />
            </div>
            <div className={styles.profileSection}>
              <span>활동시간</span>
              <Input
                value={userProfile.activityTime}
                style={{ width: 100 }}
                readOnly
              />
            </div>
            <div className={styles.profileSection}>
              <span>MBTI</span>
              <Input
                value={userProfile.mbti}
                style={{ width: 80 }}
                readOnly
              />
            </div>
          </div>

          {/* 본인 소개 */}
          <div className={styles.profileSection}>
            <span>본인 소개</span>
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 5 }}
              value={userProfile.detail}
              style={{
                maxWidth: 472,
                overflowWrap: "break-word",
                wordWrap: "break-word",
              }}
              readOnly
            />
          </div>

          {/* 작성한 게시글 */}
          <div className={styles.postsSection}>
            <span className={styles.postsCreated}>
              {userProfile.nickname}님이 작성한 게시글
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
