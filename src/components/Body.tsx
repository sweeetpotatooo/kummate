import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import RecommendationCard from './RecommendCard';
import Modal from './ArticleModal';
import styles from './Body.module.css';
import arrow_left from '../assets/Polygon 1.svg';
import arrow_right from '../assets/Polygon 2.svg';
import Info from './Info.json';
import Info2 from './RecommendCard.json';
import Profiles from './Profile.json';

type InfoData = {
  [key: string]: {
    Title: string;
    Dormtype: string;
    Now_Num: number;
    Max_Num: number;
    Gender: string;
    Date: string;
    tags: string[];
    Content: string;
    Author: string;
  };
};

type RecommendData = {
  [key: string]: {
    Nickname: string;
  };
};

type ProfileData = {
  [key: string]: {
    age: number;
    major: string;
    mbti: string;
    smoker: boolean;
    snorer: boolean;
    teethGrinder: boolean;
  };
};

const Body = () => {
  const infoData: InfoData = Info;
  const recommendData: RecommendData = Info2;
  const profiles: ProfileData = Profiles;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<InfoData[keyof InfoData] | null>(null);

  const handleCardClick = (article: InfoData[keyof InfoData]) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <>
      <div className={styles.bodyContainer1}>
        <h2 className={styles.title}> 룸메이트 구해요</h2>
        <div className={styles.groupAndArrowContainer}>
          <div className={styles.groupContainer}>
            {Object.keys(infoData).map((key, index) => (
              <ArticleCard key={index} Info={infoData[key]} onClick={() => handleCardClick(infoData[key])} />
            ))}
          </div>
          <img className={styles.polygonIcon1} alt="" src={arrow_left} />
          <img className={styles.polygonIcon2} alt="" src={arrow_right} />
        </div>
      </div>

      <div className={styles.bodyContainer2}>
        <h2 className={styles.title}> KUMMATE에서 추천하는 룸메이트를 만나보세요!</h2>
        <div className={styles.groupAndArrowContainer}>
          <div className={styles.groupContainer}>
            {Object.keys(recommendData).map((key, index) => (
              <RecommendationCard key={index} recommendationInfo={recommendData[key]} />
            ))}
          </div>
          <img className={styles.polygonIcon1} alt="" src={arrow_left} />
          <img className={styles.polygonIcon2} alt="" src={arrow_right} />
        </div>
      </div>

      {selectedArticle && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          status="진행"
          title={selectedArticle.Title}
          profile={profiles[selectedArticle.Author]}
          content={selectedArticle.Content}
        />
      )}
    </>
  );
};

export default Body;
