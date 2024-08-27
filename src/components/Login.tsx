//src/components/Login.tsx
import styles from './Login.module.css';
import { googleUserLogin, kakaoUserLogin, loginUser } from "../api";
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Googlebutton from '../assets/Google.png';
import Kakaobutton from '../assets/Kakao.png';

const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailPlaceholderVisible, setEmailPlaceholderVisible] = useState(true);
  const [passwordPlaceholderVisible, setPasswordPlaceholderVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleKakaoLogin = () => {
    window.location.href = kakaoUserLogin;
  };

  const handleGoogleLogin = () => {
    window.location.href = googleUserLogin;
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleEmailClick = () => {
    setEmailPlaceholderVisible(false);
  };

  const handlePasswordClick = () => {
    setPasswordPlaceholderVisible(false);
  };

  const handleEmailBlur = () => {
    if (email === "") {
      setEmailPlaceholderVisible(true);
    }
  };

  const handlePasswordBlur = () => {
    if (password === "") {
      setPasswordPlaceholderVisible(true);
    }
  };

  const handleLogin = async () => {
    try {
      console.log(`login_user:`);
      const userData = await loginUser(email, password);
  
      // 로그인 성공 시, 예를 들어 토큰을 저장하고 메인 페이지로 이동
      localStorage.setItem('token', userData.token);
      navigate('/'); // 로그인 후 메인 페이지로 이동
    } catch (error) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.loginParent}>
          <div className={styles.login}>Log In</div>
          <div className={styles.div} onClick={handleSignupClick}>아직 회원이 아니신가요? 회원가입하기</div>
          <div className={styles.wrapper}>
            <div className={styles.div1}>
              <div className={styles.child} />
              <b className={styles.b}>로그인</b>
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.div2}>
            <input 
              type="email" 
              id="email" 
              className={styles.input} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={emailPlaceholderVisible ? "email" : ""}
              onClick={handleEmailClick}
              onBlur={handleEmailBlur}
            />
          </div>
          <div className={styles.div3}>
            <input 
              type="password" 
              id="password" 
              className={styles.input} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={passwordPlaceholderVisible ? "password" : ""}
              onClick={handlePasswordClick}
              onBlur={handlePasswordBlur}
            />
          </div>
          <button className={styles.loginButton} onClick={handleLogin}>로그인</button>
          <img className={styles.googlelogin} alt="Google 로그인" src={Googlebutton} onClick={handleGoogleLogin}/>
          <img className={styles.kakaologin} alt="Kakao 로그인" src={Kakaobutton} onClick={handleKakaoLogin}/>
        </div>
      </div>
      <b className={styles.kummate}>KUMMATE</b>
    </div>
  );
};

export default Login;
