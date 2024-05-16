import { FunctionComponent } from 'react';
import styles from './RecommendCard.module.css';
type RecommendProps = {
  recommendationInfo: {
    Nickname: string;
  };
};


const Group:FunctionComponent<RecommendProps> = ({recommendationInfo}) => {
  	return (
    		<div className={styles.div}>
      			<div className={styles.child} />
      			<div className={styles.div1}>
        				<div className={styles.item} />
        				<b className={styles.b}>추천</b>
      			</div>
      			<div className={styles.div2}>
        				<div className={styles.inner} />
        				<b className={styles.b1}>프로필 보기</b>
      			</div>
      			<div className={styles.div3}>{recommendationInfo.Nickname}</div>
      			<div className={styles.oooContainer}>
        				<p className={styles.ooo}>OOO님과 프로필이 비슷한</p>
        				<p className={styles.ooo}>룸메이트입니다!</p>
        				<p className={styles.ooo}>{`확인해보세요 ~ `}</p>
      			</div>
    		</div>);
};

export default Group;
