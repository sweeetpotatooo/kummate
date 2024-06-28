import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import HomeView from "./pages/HomeView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoommateArticle from "./pages/RoommateArticle";
import store from "./Redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/*" element={<Signup />} />
          <Route path="/article" element={<RoommateArticle />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
