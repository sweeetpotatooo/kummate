import { FunctionComponent } from 'react';
import styles from './Header.module.css';
import Notice from '../assets/Notification important.svg';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../Redux/store";
import { logOutUser } from "../Redux/user";
import { useNavigate } from 'react-router-dom';

const Header: FunctionComponent = () => {
  const isLoggedIn = useSelector((state: RootState) =>
    Boolean(state.user.data.token.atk)
  );
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();
  const userToken = useSelector((state: RootState) => state.user.data.token.atk);

  const handleLogout = async () => {
    try {
      await dispatch(logOutUser({ userToken }));
      navigator("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigateToArticle = () => {
    navigator('/article');
  };

  const handleNavigateHome = () => {
    navigator('/');
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerChild}>
        <div className={styles.div}>
          <div className={styles.div1}>
            <div className={styles.div2} onClick={isLoggedIn ? handleLogout : () => navigator('/login')}>
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
