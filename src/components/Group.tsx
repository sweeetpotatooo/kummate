
import { FunctionComponent } from 'react';
import styles from './Group.module.css';


const Group:FunctionComponent = () => {
  	return (
    		<div className={styles.rectangleParent}>
      			<div className={styles.groupChild} />
      			<div className={styles.parent}>
        				<div className={styles.div}>
          					<div className={styles.div1}>
            						<img className={styles.child} alt="" src="Rectangle 11.svg" />
            						<b className={styles.b}>모시래 4인</b>
          					</div>
<div className={styles.div2}>
            						<div className={styles.item} />
            						<b className={styles.b1}>2/4</b>
          					</div>
        				</div>
        				<div className={styles.title}>TITLE</div>
        				<div className={styles.div3}>2023-10-10</div>
        				<div className={styles.groupItem} />
      			</div>
      			<div className={styles.div4}>
        				<img className={styles.inner} alt="" src="Rectangle 11.svg" />
        				<b className={styles.b2}># 신입생</b>
      			</div>
      			<img className={styles.groupInner} alt="" src="Rectangle 11.svg" />
    		</div>);
};

export default Group;
