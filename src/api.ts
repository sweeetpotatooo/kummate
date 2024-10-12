// 사용자 관련 API 엔드포인트 상수 정의
export const userLogin = "auth/signin"; // 사용자 로그인 경로
export const userLogout = "auth/logout"; // 사용자 로그아웃 경로
export const refreshApiUrl = "auth/refresh"; // 토큰 새로 고침 경로
export const userRegister = "auth/register"; // 사용자 등록 경로
export const kakaoUserLogin = import.meta.env.VITE_KAKAO_LOGIN; // 카카오 로그인 URL (환경 변수 사용)
export const googleUserLogin = import.meta.env.VITE_GOOGLE_LOGIN; // 구글 로그인 URL (환경 변수 사용)
export const googleLogin = "auth/login/google"; // 구글 로그인 경로
export const userArticle = "articles"; // 게시물 관련 경로
export const userFavorite = "articles/favorites"; // 즐겨찾기 관련 경로
export const userMyFavorite = "my/favorites"; // 사용자의 즐겨찾기 목록 경로
export const userMyArticles = "my/articles"; // 사용자의 게시물 목록 경로
export const userMyprofile = "my"; // 사용자의 프로필 정보 경로
export const userMyprofileNickname = "my/nickname"; // 사용자 닉네임 수정 경로
export const userMyprofileFile = "my/image"; // 사용자 프로필 이미지 수정 경로
export const kakaoLogin = "auth/login/kakao"; // 카카오 로그인 경로
export const userMyToApplicants = "applicant/myApplications"; // 내가 받은 신청자 목록 경로
export const userMyFromApplicants = "applicant/receivedApplications"; // 내가 보낸 신청자 목록 경로
export const userAprove = "applicant/approve"; // 신청 승인 경로
export const userRefuse = "applicant/refuse"; // 신청 거절 경로
export const usersRecommend = "users/recommendation"; // 사용자 추천 경로
export const usersProfile = "user/profile"; // 사용자 프로필 정보 경로
export const userArticleApply = "articles/apply"; // 게시물 신청 경로
export const userApplicant = "applicant"; // 신청자 관련 경로
export const userChatRoom = "chat"; // 채팅 방 경로
export const userChatList = "chat/list"; // 채팅 목록 경로


import axios from 'axios'; // axios 라이브러리를 가져옴

export const API_URL = 'http://localhost:3001'; // 백엔드 API 서버 주소

// 사용자 로그인 함수 정의l
export const loginUser = async (email: string, password: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    console.log(`login:`); // 로그인 시도 로그 출력
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    }); // 로그인 요청을 POST 메서드로 전송
    console.log(`response:${JSON.stringify(response.data)}`); // 응답 데이터 로그 출력
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 오류 발생 시 오류를 호출자에게 던짐
  }
};
