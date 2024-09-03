import React from "react"
import { Provider } from "react-redux"
import { store } from "./Redux/store"
import "../src/App.css"
import { ConfigProvider } from "antd"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header/header"
import MainPage from "../src/pages/MainPage/mainPage"
import Footer from "./components/Footer/footer"
import Login from "./pages/Login/login"
import SignUp from "./pages/SignUp/signUp"
import Profile from "./pages/MyPage/Proflie/profile"
import RoomMate from "./pages/RoomMate/roomMate"
import Board from "./pages/MyPage/Board/board"
import Favorite from "./pages/MyPage/Favorites/favorite"
import WritePage from "./pages/WritePage/writePage"
import EditPage from "./pages/EditPage/editPage"
import Kakao from "./components/SocialLogin/kakao"
import Apply from "./pages/MyPage/Applicant/apply"
import Google from "./components/SocialLogin/google"
import Chat from "./components/Header/chat/chat"

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#006400",
            fontSize: 12,
          },
        }}
      >
        <BrowserRouter>
          <Header />
          <section className='main'>
            <Routes>
              <Route path="/RoomMate" element={<RoomMate />} />
              <Route path="/" element={<Login />} />
              <Route path="/MainPage" element={<MainPage />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/MyPage" element={<Profile />} />
              <Route path="/Board" element={<Board />} />
              <Route path="/Apply" element={<Apply />} />
              <Route path="/Favorite" element={<Favorite />} />
              <Route path="/WritePage" element={<WritePage />} />
              <Route path="/editPage/:postId" element={<EditPage />} />
              <Route path="/kakao" element={<Kakao />} />
              <Route path="/google" element={<Google />} />
              <Route path="/Chat" element={<Chat />} />
            </Routes>
          </section>
          <Footer />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  )
}

export default App
