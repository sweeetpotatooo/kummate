import { FunctionComponent } from 'react';
import styles from './Group.module.css';
import Rectangle from '../assets/Rectangle11.svg';


/*
let Title: String[] =["컴공 룸메 구해요","운동 좋아하시는 분", "고학번만","신입생 친구"];
let Dormtype: String[] = ["모시래 4인","해오름 4인","모시래 4인","해오름 4인"];
let Now_Num: number[]=[0,1,2,3];
let Max_Num: number[]=[4,4,4,4];
let Gender:String[]=["남","여"];
let Date:String[]=["2024-05-09","2024-05-10","2024-05-11","2024-05-12","2024-05-13"];
let Tag1: String[]=["신입생","운동"];
let Tag2: String[]=["조용","아침형"];
*/
const Info = {
	data: {
			Title: '아메리카노',
			Dormtype: '쓴 맛',
			Now_Num: 0,
			Max_Num: 2,
			Gender:'남',
			Date: '2024-05-09',
			Tag1: "신입생",
			Tag2: "조용"
	} 
}
const Group:FunctionComponent = (Info) => {
  	return (
    		<div className={styles.div}>
      			<div className={styles.child} />
      			<div className={styles.item} />
      			<b className={styles.b}>{data.Now_Num}/{data.Max_Num}</b>
      			<div className={styles.title}>{data.Title}</div>
      			<img className={styles.inner} alt="" src={Rectangle} />
      			<b className={styles.b1}>{data.Dormtype}</b>
      			<div className={styles.div1}>{data.Date}</div>
      			<div className={styles.rectangleDiv} />
      			<img className={styles.rectangleIcon} alt="" src={Rectangle} />
      			<b className={styles.b2}>{.Gender}</b>
      			<img className={styles.child1} alt="" src={Rectangle} />
      			<b className={styles.b3}>{data.Tag1}</b>
      			<b className={styles.b4}># {data.Tag2}</b>
    		</div>);
};

export default Group;


