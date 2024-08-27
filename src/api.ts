export const userLogin = "users/login"
export const userLogout = "users/logout"
export const refreshApiUrl = "users/login"
export const userRegister = "users/register"
export const kakaoUserLogin = import.meta.env.VITE_KAKAO_LOGIN
export const googleUserLogin = import.meta.env.VITE_GOOGLE_LOGIN
export const googleLogin = "users/login/google"
export const userArticle = `articles`
export const userFavorite = "articles/favorites"
export const userMyFavorite = "my/favorites"
export const userMyArticles = "my/articles"
export const userMyprofile = "my"
export const userMyprofileNickname = "my/nickname"
export const userMyprofileFile = "my/image"
export const kakaoLogin = "users/login/kakao"
export const userMyToApplicants = "my/to-applicants"
export const userMyFromApplicants = "my/from-applicants"
export const userAprove = "applicant/approve"
export const userRefuse = "applicant/refuse"
export const usersRecommend = "users/recommendation"
export const usersProfile = "users/profile"
export const userArticleApply = "articles/apply"
export const userApplicant = "applicant"
export const userChatRoom = "chat"
export const userChatList = "chat/list"

import axios from 'axios';

const API_URL = 'http://localhost:3001'; // 백엔드 API 서버 주소

export const loginUser = async (email: string, password: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    console.log(`login:`);
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    console.log(`response:${JSON.stringify(response.data)}`)
    return response.data;
  } catch (error) {
    throw error;
  }
};
