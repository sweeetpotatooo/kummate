// src/pages/MyPage/Applicant/otherUserProfile.tsx
import { Button, Input, Modal, Radio } from "antd"
import React, { useEffect, useState } from "react"
import styles from "./otherUserProfile.module.css"
import { Post, RecommendModalProps } from "../../../interface/interface"
import PostModal from "../../../components/PostModal/postModal"

const OtherUserProfile: React.FC<RecommendModalProps> = ({
  visible,
  onClose,
  userProfile,
}) => {
  const [checkedGender, setCheckedGender] = useState<string>("")
  const [checkedSmoking, setCheckedSmoking] = useState<string>("")
  const [selectedArticle, setSelectedArticle] = useState<Post | null>(null)

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userProfile) {
          setCheckedGender(userProfile.gender)
          setCheckedSmoking(userProfile.isSmoker ? "흡연" : "비흡연")
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }
    fetchData()
  }, [userProfile])

  const smokingOptions = [
    { label: "흡연", value: "흡연" },
    { label: "비흡연", value: "비흡연" },
  ]

  const genderOptions = [
    { label: "여자", value: "여자" },
    { label: "남자", value: "남자" },
  ]

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
        {userProfile && (
          <>
            {/* 프로필 이미지 추가 */}
            <div className={styles.profileImageContainer}>
              <img
                src={userProfile.image || "/profile.svg"}
                alt={`${userProfile.nickname}의 프로필`}
                className={styles.profileImage}
              />
            </div>

            <div className={styles.profileTitle}>
              <span>
                <span className={styles.userProfileNickname}>
                  {userProfile.nickname}
                </span>{" "}
                님의 프로필
              </span>
            </div>
            <div className={styles.profileBox}>
              {/* 첫 번째 줄: 성별과 흡연 */}
              <div className={`${styles.profileSection} ${styles.profileSection2Col}`}>
                <span>성별</span>
                <Radio.Group
                  options={genderOptions}
                  value={checkedGender}
                  optionType="button"
                  className={styles.customGenderRadioGroup}
                />
              </div>
              <div className={`${styles.profileSection} ${styles.profileSection2Col}`}>
                <span>흡연</span>
                <Radio.Group
                  options={smokingOptions}
                  value={checkedSmoking}
                  optionType="button"
                  className={styles.customSmokingRadioGroup}
                />
              </div>

              {/* 두 번째 줄: 학과와 나이 */}
              <div className={`${styles.profileSection} ${styles.profileSection2Col}`}>
                <span>학과</span>
                <Input
                  value={userProfile.department}
                  style={{ width: '100%' }}
                  readOnly
                />
              </div>
              <div className={`${styles.profileSection} ${styles.profileSection2Col}`}>
                <span>나이</span>
                <Input
                  value={userProfile.age}
                  style={{ width: '100%' }}
                  readOnly
                />
              </div>

              {/* 세 번째 줄: 활동시간, 기숙사, MBTI */}
              <div className={`${styles.profileSection} ${styles.profileSection3Col}`}>
                <span>활동시간</span>
                <Input
                  value={userProfile.activityTime}
                  style={{ width: '100%' }}
                  readOnly
                />
              </div>
              <div className={`${styles.profileSection} ${styles.profileSection3Col}`}>
                <span>기숙사</span>
                <Input
                  value={userProfile.region}
                  style={{ width: '100%' }}
                  readOnly
                />
              </div>
              <div className={`${styles.profileSection} ${styles.profileSection3Col}`}>
                <span>MBTI</span>
                <Input
                  value={userProfile.mbti}
                  style={{ width: '100%' }}
                  readOnly
                />
              </div>

              {/* 네 번째 줄: 본인 소개 */}
              <div className={`${styles.profileSection} ${styles.profileSection4Col}`}>
                <span>본인 소개</span>
                <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 5 }}
                  value={userProfile.detail}
                  className={styles.profileInput}
                  readOnly
                />
              </div>
            </div>
          </>
        )}
      </Modal>
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

export default OtherUserProfile
