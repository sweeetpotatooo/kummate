import { FunctionComponent } from 'react';
import styles from './RecommendCard.module.css';

type RecommendProps = {
  recommendationInfo: {
    Nickname: string;
  };
};

const Group: FunctionComponent<RecommendProps> = ({ recommendationInfo }) => {
  return (
    <div className={styles.div}>
      <div className={styles.div2}>
        <div className={styles.inner} />
      </div>
      <div className={styles.div3}>{recommendationInfo.Nickname}</div>
      <div className={styles.oooContainer}>
        <p className={styles.ooo}>OOO님과 프로필이 비슷한</p>
        <p className={styles.ooo}>룸메이트입니다!</p>
        <p className={styles.ooo}>확인해보세요 ~ </p>
      </div>
    </div>
  );
};

export default Group;
