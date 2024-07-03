import React from 'react';
import styles from './ArticleCard.module.css';

interface CardComponentProps {
  Info: {
    Title: string;
    Dormtype: string;
    Now_Num: number;
    Max_Num: number;
    Gender: string;
    Date: string;
    tags: string[];
  };
}

const CardComponent: React.FC<CardComponentProps> = ({ Info }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.badge}>{Info.Dormtype}</span>
        <span className={styles.infoIcon}>{Info.Gender}</span>
      </div>
      <div className={styles.title}>{Info.Title}</div>
      <div className={styles.dateParticipants}>
        <span className={styles.date}>{Info.Date}</span>
        <span className={styles.participants}>{Info.Now_Num}/{Info.Max_Num}</span>
      </div>
      <div className={styles.rectangleDiv}>
        <div className={styles.tags}>
          {Info.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
