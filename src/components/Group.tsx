import { FunctionComponent } from 'react';
import styles from './Group.module.css';
import Rectangle from '../assets/Rectangle11.svg';


const Group:FunctionComponent = () => {
  	return (
    		<div className={styles.div}>
      			<div className={styles.child} />
      			<div className={styles.item} />
      			<b className={styles.b}>2/4</b>
      			<div className={styles.title}>TITLE</div>
      			<img className={styles.inner} alt="" src={Rectangle} />
      			<b className={styles.b1}>모시래 4인</b>
      			<div className={styles.div1}>2023-10-10</div>
      			<div className={styles.rectangleDiv} />
      			<img className={styles.rectangleIcon} alt="" src={Rectangle} />
      			<b className={styles.b2}>🚹</b>
      			<img className={styles.child1} alt="" src={Rectangle} />
      			<b className={styles.b3}>#운동</b>
      			<b className={styles.b4}># 신입생</b>
    		</div>);
};

export default Group;
