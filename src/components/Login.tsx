import { FunctionComponent } from 'react';
import styles from './Login.module.css';
import Google from '../assets/Google.png';
import Kakao from '../assets/Kakao.png';


const Login:FunctionComponent = () => {
  	return (
    		<div className={styles.page}>
      			<div className={styles.rectangleParent}>
        				<div className={styles.groupChild} />
        				<div className={styles.loginParent}>
          					<div className={styles.login}>LogIn</div>
          					<div className={styles.div}>아직 회원이 아니신가요?  회원가입하기</div>
            						<div className={styles.wrapper}>
              							<div className={styles.div1}>
                								<div className={styles.child} />
                								<b className={styles.b}>로그인</b>
              							</div>
            						</div>
            						<div className={styles.div2}>
              							<label htmlFor="email" className={styles.label}>Email</label>
  													<input type="email" id="email" className={styles.input} />
														<div className={styles.item} />
            						</div>
            						<div className={styles.div3}>
              							<label htmlFor="password" className={styles.label}>Password</label>
  													<input type="password" id="password" className={styles.input} />
														<div className={styles.item} />
            						</div>
            						<img className={styles.googlelogin} alt="" src={Google} />
            						<img className={styles.kakaologin} alt="" src={Kakao} />
												</div>
            						</div>
            						<b className={styles.kummate}>KUMMATE</b>
            						</div>);
          					};
          					
          					export default Login;
          					