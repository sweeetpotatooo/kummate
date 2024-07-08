import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleNextStep = () => {
    // Proceed to next step
    navigate('/signup/step3');
  };

  const mbtiOptions = [
    '선택하세요', 'ISTJ', 'ISFJ', 'INFJ', 'INTJ', 
    'ISTP', 'ISFP', 'INFP', 'INTP', 
    'ESTP', 'ESFP', 'ENFP', 'ENTP', 
    'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
  ];

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
          <label className={styles.label}>MBTI</label>
          <select
            className={styles.select}
            value={mbti}
            onChange={(e) => setMbti(e.target.value)}
            required
          >
            {mbtiOptions.map((option) => (
              <option key={option} value={option === '선택하세요' ? '' : option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.specialNotes}>
          <label className={styles.specialNotesLabel}>특이사항</label>
          <div className={styles.specialNoteGroup}>
            <div className={styles.specialNote}>
              <input
                type="checkbox"
                checked={smoking}
                onChange={(e) => setSmoking(e.target.checked)}
              />
              <label>흡연유무</label>
            </div>
            <div className={styles.specialNote}>
              <input
                type="checkbox"
                checked={snoring}
                onChange={(e) => setSnoring(e.target.checked)}
              />
              <label>코골이 여부</label>
            </div>
            <div className={styles.specialNote}>
              <input
                type="checkbox"
                checked={teethGrinding}
                onChange={(e) => setTeethGrinding(e.target.checked)}
              />
              <label>이갈이 여부</label>
            </div>
          </div>
        </div>
        <button className={`${styles.button} ${styles.nextButton}`} onClick={handleNextStep}>
          다음
        </button>
      </div>
    </div>
  );
};

export default SignupStep2;
