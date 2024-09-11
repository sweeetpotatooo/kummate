import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./header.module.css";  // 헤더 컴포넌트에 대한 CSS 모듈
import { useSelector, useDispatch } from "react-redux";  // Redux의 상태 관리를 위한 hook들
import { AppDispatch, RootState } from "../../Redux/store";  // dispatch 및 RootState의 타입 정의
import { logOutUser } from "../../Redux/user";  // 로그아웃 액션
import { RiMessage3Fill } from "react-icons/ri";  // 채팅 아이콘에 사용할 React 아이콘

/**
 * 헤더 컴포넌트: 네비게이션, 로그아웃, 반응형 동작을 처리
 */
const Header: React.FC = () => {
  // Redux 상태에서 로그인 상태 가져오기
  const isLoggedIn = useSelector((state: RootState) =>
    Boolean(state.user.isLogged)
  );
  
  // Redux의 dispatch 함수를 가져와서 액션을 디스패치할 때 사용
  const dispatch: AppDispatch = useDispatch();
  
  // React Router의 useNavigate hook을 사용하여 페이지 이동
  const navigator = useNavigate();
  
  // Redux 상태에서 사용자 토큰 가져오기
  const userToken = useSelector((state: RootState) => state.user.data.token.atk);

  // 로그인 상태 콘솔에 출력 (디버깅 용도)
  console.log("isLogged:", isLoggedIn);

  // 로그아웃 핸들러 함수
  const handleLogout = async () => {
    try {
      // 로그아웃 액션을 디스패치하고 성공 시 메인 페이지로 이동
      await dispatch(logOutUser({ userToken }));
      navigator("/");  // 로그아웃 후 메인 페이지로 이동
    } catch (error) {
      // 에러 발생 시 콘솔에 에러 메시지 출력
      console.error(error);
    }
  };

  // 채팅 페이지로 이동하는 함수
  const chatOnClick = () => {
    navigator("/Chat");
  };

  // 창의 너비를 상태로 관리하기 위한 useState
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 창 크기 변경 시 windowWidth 업데이트
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 리사이즈 이벤트 핸들러 추가
    window.addEventListener("resize", handleResize);
    
    // 컴포넌트 언마운트 시 리사이즈 이벤트 핸들러 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.headerContainer}>
        {/* 메인 페이지로 이동하는 링크 */}
        <Link to="/MainPage">
          <b>KUMMATE</b>
        </Link>
        <div className={styles.menu}>
          <ul className={styles.nav}>
            {/* 룸메이트 구해요 페이지로 이동하는 링크 */}
            <Link to="/RoomMate" className={styles.roommate}>
              <li>룸메이트 구해요</li>
            </Link>
            {/* 채팅 아이콘, 클릭 시 채팅 페이지로 이동 */}
            <div className={styles.chatIcon} onClick={chatOnClick}>
              <RiMessage3Fill style={{ color: "006400" }} size={25} />
            </div>
            {/* 로그인 상태에 따라 다른 메뉴 표시 */}
            {isLoggedIn && (
              <Link to="/mypage" className={styles.mypage}>
                <li>내 정보</li>
              </Link>
            )}
            {/* 로그인 상태에 따라 로그인/로그아웃 표시 */}
            {isLoggedIn ? (
              <div className={styles.logout} onClick={handleLogout}>
                <li>로그아웃</li>
              </div>
            ) : (
              <>
                <Link to="/" className={styles.logout}>
                  <li>로그인</li>
                </Link>
                <Link to="/SignUp" className={styles.signup}>
                  <li>회원가입</li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* 구분선 */}
      <div className={styles.line}></div>
    </>
  );
};

export default Header;
