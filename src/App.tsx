import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import Login from "./views/Login";
import {Provider} from 'react-redux';
import store from './Redux/store';
const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </Provider>
            );
        };

export default App;
