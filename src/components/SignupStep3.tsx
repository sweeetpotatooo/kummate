import React, { useState } from 'react';
import styles from './SignupStep3.module.css';

const SignupStep3: React.FC = () => {
  const [likedRoommates, setLikedRoommates] = useState<string[]>([]);
  const [dislikedRoommates, setDislikedRoommates] = useState<string[]>([]);

  const roommateOptions = ['조용한', '깨끗한', '정리정돈을 잘하는', '외향적인', '내향적인', '일찍 일어나는', '늦게 일어나는'];

  const toggleSelection = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleNextStep = () => {
    // Proceed to next step
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.header}>회원가입</h2>
        
        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>이런 룸메이트는 좋아요</h3>
          <div className={styles.buttonContainer}>
            {roommateOptions.map(option => (
              <button
                key={option}
                className={`${styles.button} ${likedRoommates.includes(option) ? styles.selected : ''}`}
                onClick={() => toggleSelection(likedRoommates, setLikedRoommates, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>이런 룸메이트는 싫어요</h3>
          <div className={styles.buttonContainer}>
            {roommateOptions.map(option => (
              <button
                key={option}
                className={`${styles.button} ${dislikedRoommates.includes(option) ? styles.selected : ''}`}
                onClick={() => toggleSelection(dislikedRoommates, setDislikedRoommates, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button className={styles.nextButton} onClick={handleNextStep}>
          다음
        </button>
      </div>
    </div>
  );
};

export default SignupStep3;
