import React from "react";
import Group from './Group';
import RecommendationCard from './RecommendCard'
import styles from './Body.module.css';

const Body = () => {
    return (
        <>
        <div className={styles.bodyContainer1}>
          <h2 className={styles.title}> 룸메이트 구해요</h2>
          <div className={styles.groupContainer}>
            <Group />
            <Group />
            <Group />
            <Group />
          </div>
        </div>
      
        <div className={styles.bodyContainer2}>
          <h2 className={styles.title}> KUMMATE에서 추천하는 룸메이트를 만나보세요</h2>
          <div className={styles.groupContainer}>
            <RecommendationCard/> 
            <RecommendationCard/> 
            <RecommendationCard/> 
            <RecommendationCard/> 
          </div>
        </div>
        </>

    );
};

export default Body;
