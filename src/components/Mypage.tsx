import React, { useState } from 'react';
import styles from './Mypage.module.css';

const MyPage: React.FC = () => {
  const [nickname, setNickname] = useState('김건국');
  const [email, setEmail] = useState('kimkonkuk@kku.ac.kr');
  const [profileText, setProfileText] = useState('');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleProfileTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfileText(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>마이페이지</h1>
      <div className={styles.profileSection}>
        <div className={styles.profilePic}>
          <div className={styles.photoPlaceholder}>사진</div>
        </div>
        <div className={styles.profileDetails}>
          <label className={styles.label}>닉네임</label>
          <input
            type="text"
            className={styles.input}
            value={nickname}
            onChange={handleNicknameChange}
          />
          <button className={styles.editButton}>수정</button>

          <label className={styles.label}>이메일</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={handleEmailChange}
          />
          <button className={styles.verifyButton}>인증 완료</button>
        </div>
      </div>

      <h2 className={styles.subtitle}>내 프로필</h2>
      <div className={styles.profileInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>저의 학번은</span>
          <span className={styles.infoValue}>202420123</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>저는</span>
          <span className={styles.infoValue}>컴퓨터공학과</span>
        </div>
        {/* 추가 프로필 정보 */}
      </div>

      <div className={styles.profileEdit}>
        <textarea
          className={styles.textarea}
          value={profileText}
          onChange={handleProfileTextChange}
          placeholder="추가로 하고 싶은 말을 적어주세요!"
        />
        <button className={styles.saveButton}>내 프로필 수정</button>
      </div>
    </div>
  );
};

export default MyPage;
