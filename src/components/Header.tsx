import { FunctionComponent } from 'react';
import styles from './Header.module.css';
import Notice from '../assets/Notification important.svg';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../Redux/store";
import { clearToken } from "../Redux/userSlice";
import { useNavigate } from 'react-router-dom';

const Header: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  
  // 로그인 상태 및 토큰 가져오기
  const isLoggedIn = useSelector((state: RootState) => Boolean(state.user.token));
  const userToken = useSelector((state: RootState) => state.user.token);

  const handleLogout = async () => {
    if (userToken) {
      try { 
        // 로그아웃 처리
        dispatch(clearToken()); // 토큰 제거
        navigate("/"); // 홈으로 이동
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleNavigateToArticle = () => {
    navigate('/article');
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerChild}>
        <div className={styles.div}>
          <div className={styles.div1}>
            <div
              className={styles.div2}
              onClick={isLoggedIn ? handleLogout : handleLogin}
            >
              {isLoggedIn ? '로그아웃' : '로그인'}
            </div>
            {isLoggedIn && <div className={styles.div3}>마이페이지</div>}
            <div className={styles.div4} onClick={handleNavigateToArticle}>
              룸메이트 구해요
            </div>
          </div>
        </div>
        <b className={styles.kummate} onClick={handleNavigateHome}>KUMMATE</b>
        <img className={styles.noticeIcon} alt="" src={Notice} />
      </div>
    </div>
  );
};

export default Header;
