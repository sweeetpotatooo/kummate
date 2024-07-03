import ArticleCard from './ArticleCard';
import RecommendationCard from './RecommendCard';
import styles from './Body.module.css';
import arrow_left from '../assets/Polygon 1.svg';
import arrow_right from '../assets/Polygon 2.svg';
import Info from './Info.json'; // Info.json 파일을 가져옵니다.
import Info2 from './RecommendCard.json';

// Info.json 파일에서 데이터를 가져와서 그 형식을 정의합니다.
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
  };
};

type RecommendData = {
  [key: string]: {
    Nickname: string;
  };
};

const Body = () => {
  const infoData: InfoData = Info;
  const recommendData: RecommendData = Info2;
  return (
    <>
      <div className={styles.bodyContainer1}>
        <h2 className={styles.title}> 룸메이트 구해요</h2>
        <div className={styles.groupAndArrowContainer}>
          <div className={styles.groupContainer}>
            {Object.keys(infoData).map((key, index) => (
              <ArticleCard key={index} Info={infoData[key]} />
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
    </>
  );
};

export default Body;
