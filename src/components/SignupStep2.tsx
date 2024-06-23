import React, { useState } from 'react';
import styles from './SignupStep2.module.css';

const SignupStep2: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [age, setAge] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [smoking, setSmoking] = useState(false);
  const [mbti, setMbti] = useState('');
  const [snoring, setSnoring] = useState(false);
  const [teethGrinding, setTeethGrinding] = useState(false);
  const [details, setDetails] = useState('');

  const handleNextStep = () => {
    // Proceed to next step
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.header}>회원가입</h2>
        <div className={styles.inputField}>
          <label className={styles.label}>닉네임</label>
          <input
            type="text"
            className={styles.input}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>학번</label>
          <input
            type="text"
            className={styles.input}
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>학과</label>
          <input
            type="text"
            className={styles.input}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>나이</label>
          <input
            type="number"
            className={styles.input}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>프로필 이미지</label>
          <input
            type="file"
            className={styles.input}
            onChange={(e) => setProfileImage(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>흡연유무</label>
          <input
            type="checkbox"
            checked={smoking}
            onChange={(e) => setSmoking(e.target.checked)}
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>MBTI</label>
          <input
            type="text"
            className={styles.input}
            value={mbti}
            onChange={(e) => setMbti(e.target.value)}
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>코골이 여부</label>
          <input
            type="checkbox"
            checked={snoring}
            onChange={(e) => setSnoring(e.target.checked)}
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>이갈이 여부</label>
          <input
            type="checkbox"
            checked={teethGrinding}
            onChange={(e) => setTeethGrinding(e.target.checked)}
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>세부사항</label>
          <textarea
            className={styles.input}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleNextStep}>
          다음
        </button>
      </div>
      <footer className={styles.footer}>FOOTER</footer>
    </div>
  );
};

export default SignupStep2;
