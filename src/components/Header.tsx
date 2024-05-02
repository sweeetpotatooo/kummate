
import { FunctionComponent } from 'react';
import styles from './Header.module.css';


const Group:FunctionComponent = () => {
  	return (
    		<div className={styles.div}>
      			<div className={styles.child}>
							<div className={styles.div1}>
									<div className={styles.div2}>
											<div className={styles.div3}>로그아웃</div>
											<div className={styles.div4}>마이페이지</div>
											<div className={styles.div5}>룸메이트 구해요</div>
									</div>
							</div>
							<b className={styles.kummate}>KUMMATE</b>
						</div>
      			
    		</div>);
};

export default Group;

