import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import styles from "./header.module.css"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../Redux/store"
import { logOutUser } from "../../Redux/user"
import { RiMessage3Fill } from "react-icons/ri"

const Header: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) =>
    Boolean(state.user.data.token.atk),
  )
  const dispatch: AppDispatch = useDispatch()
  const navigator = useNavigate()
  const userToken = useSelector((state: RootState) => state.user.data.token.atk)

  const handleLogout = async () => {
    try {
      await dispatch(logOutUser({ userToken }))
      navigator("/")
    } catch (error) {
      console.error(error)
    }
  }

  const chatOnClick = () => {
    navigator("/Chat")
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <div className={styles.headerContainer}>
        <Link to="/MainPage">
          <b>KUMMATE</b>
        </Link>
        <div className={styles.menu}>
          <ul className={styles.nav}>
            <Link to="/RoomMate" className={styles.roommate}>
              <li>룸메이트 구해요</li>
            </Link>
            <div className={styles.chatIcon} onClick={chatOnClick}>
              <RiMessage3Fill style={{ color: "006400" }} size={25} />
            </div>
            {isLoggedIn && (
              <Link to="/mypage" className={styles.mypage}>
                <li>내 정보</li>
              </Link>
            )}
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
      <div className={styles.line}></div>
    </>
  )
}

export default Header
