import React from "react";
import Group from './Group';
import RecommendationCard from './RecommendCard'
import styles from './Body.module.css';
import arrow_left from '../assets/Polygon 1.svg'
import arrow_right from '../assets/Polygon 2.svg'

let Group_Array= []
const Body = () => {
    return (
        <>
        <div className={styles.bodyContainer1}>
          <h2 className={styles.title}> 룸메이트 구해요</h2>
          <div className={styles.groupAndArrowContainer}>
            <div className={styles.groupContainer}>
                <Group />
                <Group />
                <Group />
                <Group />
            </div>
            <img className={styles.polygonIcon1} alt="" src={arrow_left} />
            <img className={styles.polygonIcon2} alt="" src={arrow_right} />
            </div>
          </div>
      
        <div className={styles.bodyContainer2}>
          <h2 className={styles.title}> KUMMATE에서 추천하는 룸메이트를 만나보세요</h2>
          <div className={styles.groupAndArrowContainer}>
          <div className={styles.groupContainer}>
            <RecommendationCard/> 
            <RecommendationCard/> 
            <RecommendationCard/> 
            <RecommendationCard/> 
            </div>
            <img className={styles.polygonIcon1} alt="" src={arrow_left} />
            <img className={styles.polygonIcon2} alt="" src={arrow_right} />
          </div>
        </div>
        </>

    );
};

export default Body;

