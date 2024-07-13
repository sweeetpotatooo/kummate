import React from 'react';
import styles from './ArticleModal.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  status: '진행' | '종료';
  title: string;
  profile: {
    age: number;
    major: string;
    mbti: string;
    smoker: boolean;
    snorer: boolean;
    teethGrinder: boolean;
  };
  content: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, status, title, profile, content }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <span className={styles.status}>{status}</span>
          <span className={styles.title}>{title}</span>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.body}>
          <div className={styles.profileSection}>
            <div className={styles.profileItem}><strong>나이:</strong> {profile.age}</div>
            <div className={styles.profileItem}><strong>학과:</strong> {profile.major}</div>
            <div className={styles.profileItem}><strong>MBTI:</strong> {profile.mbti}</div>
            <div className={styles.profileItem}><strong>흡연 여부:</strong> {profile.smoker ? '예' : '아니오'}</div>
            <div className={styles.profileItem}><strong>코골이 여부:</strong> {profile.snorer ? '예' : '아니오'}</div>
            <div className={styles.profileItem}><strong>이갈이 여부:</strong> {profile.teethGrinder ? '예' : '아니오'}</div>
          </div>
          <div className={styles.contentSection}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
