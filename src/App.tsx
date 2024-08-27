import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import HomeView from "./pages/HomeView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoommateArticle from "./pages/RoommateArticle";
import PostForm from "./pages/Postform";
import store from "./Redux/store";
import MyPage from "./pages/Mypage";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/*" element={<Signup />} />
          <Route path="/article" element={<RoommateArticle />} />
          <Route path="/postform" element={<PostForm />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
