import { FunctionComponent } from 'react';
import styles from './Header.module.css';
import Notice from '../assets/Notification important.svg';

const Header:FunctionComponent = () => {
  	return (
    		<div className={styles.header}>
      			<div className={styles.headerChild}>
      				<div className={styles.div}>
        				<div className={styles.div1}>
          					<div className={styles.div2}>로그아웃</div>
          					<div className={styles.div3}>마이페이지</div>
          					<div className={styles.div4}>룸메이트 구해요</div>
        				</div>
      			</div>
      			<b className={styles.kummate}>KUMMATE</b>
      			<img className={styles.noticeIcon} alt="" src={Notice} />
						</div>		
    		</div>);
};

export default Header;