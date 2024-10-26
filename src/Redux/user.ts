/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Token, UserState } from "../interface/interface"
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage"
import { Dispatch } from "redux"
import { RootState, AppDispatch } from "./store"
import {
  API_URL,
  googleLogin,
  kakaoLogin,
  refreshApiUrl,
  userLogin,
  userLogout,
  userRegister,
} from "../api"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"

// API URL 설정

// 초기 상태 설정, 로컬 스토리지에서 불러오거나 기본값을 설정
const initialState: UserState = loadFromLocalStorage() || {
  isLogged: false,
  signUp: false,
  data: {
    email: "",
    user_id: 0,
    token: {
      atk: "",
      rtk: "",
    },
  },
  status: "idle",
}

// 사용자 토큰 만료 시 자동 로그아웃 처리 함수
export function useAutoLogout() {
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user.data)

  useEffect(() => {
    if (token && token.atk) {
      const splitToken = token.atk.split(".")
      const tokenPayload = JSON.parse(atob(splitToken[1]))  // 토큰의 페이로드 디코딩
      const expirationTime = tokenPayload.exp * 1000  // 만료 시간 계산

      // 토큰 만료 시 로그아웃 처리
      const timeoutId = setTimeout(() => {
        dispatch(logout())
      }, expirationTime - new Date().getTime())

      // 컴포넌트 언마운트 시 타임아웃 정리
      return () => clearTimeout(timeoutId)
    }
  }, [token, dispatch])
}

// 토큰이 만료되었을 때 새로고침 처리하는 함수
export const refreshTokenIfNeeded = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>("api/users/refreshIfNeeded", async (_, { getState, dispatch }) => {
  const { token } = getState().user.data

  if (!token || !token.atk) {
    console.error("토큰 없음")
    throw new Error("No token")
  }

  const splitToken = token.atk.split(".")

  try {
    const tokenPayload = JSON.parse(atob(splitToken[1]))
    const expirationTime = tokenPayload.exp * 1000
    const currentTime = new Date().getTime()

    if (currentTime > expirationTime) {
      await dispatch(refreshToken({ refreshToken: token.rtk }))  // 만료 시 토큰 새로고침
    } else {
      dispatch(logout())  // 만료되지 않았을 때 로그아웃
    }
  } catch (error) {
    console.error(error)
    throw error
  }
})

// 사용자 로그인 처리 함수
export const loginUser = createAsyncThunk<
  UserState,
  { email: string; password: string },
  { dispatch: Dispatch; state: RootState }
>(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`${API_URL}/${userLogin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error("Login failed");
      }
      
      const data = await response.json();
      console.log("API Response Data:", data); // 응답 데이터 확인
      

      // 로그인 성공 시 콘솔에 로그 출력
      console.log('Login successful:', credentials.email);

      const userState: UserState = {
        isLogged: true,
        
        data: {
          email: credentials.email,
          user_id: data.user_id,
          token: data.token,
        },
        status: "fulfilled",
      };

      return userState;
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  },
);

// 사용자 로그아웃 처리 함수
export const logOutUser = createAsyncThunk<
  UserState,
  { userToken: string },
  { dispatch: AppDispatch; rejectValue: string; state: RootState }
>(
  "auth/logout",
  async ({ userToken }, thunkApi) => {
    try {
      console.log("로그아웃 요청 중... 토큰:", userToken); // 토큰 확인
      const response = await fetch(`${API_URL}/${userLogout}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // "Bearer " 문자열을 추가
        },
      });

      console.log("서버 응답 상태:", response.status); // 응답 상태 확인

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // 로그아웃 성공 시 디스패치
      thunkApi.dispatch(logout());
      console.log("로그아웃 성공! 상태 초기화 중...");

      const data: UserState = initialState;
      return data;
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error); // 에러 확인
      return thunkApi.rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);

// 리프레시 토큰을 새로고침하는 함수
export const refreshToken = createAsyncThunk<
  UserState,
  { refreshToken: string },
  { dispatch: Dispatch; state: RootState }
>(
  "api/users/refresh",
  async (credentials: { refreshToken: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${refreshApiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error("토큰 새로 고침 실패")
      }

      const data: UserState = await response.json();
      saveToLocalStorage(data);  // 토큰을 로컬 스토리지에 저장
      return data;
    } catch (error) {
      console.error("token refresh failed", error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  },
)

// 카카오 로그인 처리 함수
export const kakaologinUser = createAsyncThunk<
  { email: string; token: Token },
  { code: string },
  { dispatch: Dispatch; state: RootState }
>("/kakao", async (code, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/${kakaoLogin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    });

    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다");
    }

    const data: UserState = await response.json();

    return { email: data.data.email, token: data.data.token };
  } catch (error) {
    console.error("Kakao login failed", error);
    return rejectWithValue(error instanceof Error ? error.message : "Error");
  }
});

// 구글 로그인 처리 함수
export const googleloginUser = createAsyncThunk<
  { token: Token; email: string },
  { accessToken: string },
  { dispatch: Dispatch; state: RootState }
>("login/oauth2/google", async (arg, { rejectWithValue }) => {
  try {
    const { accessToken } = arg;
    const response = await fetch(`${API_URL}/${googleLogin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: accessToken }),
    });

    if (!response.ok) {
      throw new Error("Google login failed");
    }

    const data = await response.json();
    return { token: data.data.token, email: data.data.email };
  } catch (error) {
    console.error("Google login failed", error);
    return rejectWithValue(error instanceof Error ? error.message : "Error");
  }
});

// 사용자 회원가입 처리 함수
export const registerUser = createAsyncThunk<
  boolean,
  { email: string; password: string; nickname: string },
  { rejectValue: string }
>(
  "api/users/register",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${userRegister}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.status === 201) {
        return true;
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);

// Redux 슬라이스 정의
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 로그인 성공 시 상태 업데이트
    loginSuccess: (state, action) => {
      state.isLogged = true;
      state.data.token = action.payload.data.token ?? { atk: "", rtk: "" };
      state.data.email = action.payload.email ?? "";
      saveToLocalStorage(state);
    },
    // 로그아웃 시 상태 초기화
    logout: (state) => {
      console.log("리듀서에서 상태 초기화..."); // 로그아웃 시 상태 초기화 확인
      state.isLogged = false;
      state.data.token = { atk: "", rtk: "" };
      state.data.email = "";
      saveToLocalStorage(state);
    },
    
    // 카카오 로그인 성공 시 상태 업데이트
    kakaoLogin: (state, action) => {
      state.isLogged = true;
      state.data.token = action.payload.token;
      state.data.email = action.payload.email ?? "";
      saveToLocalStorage(state);
    },
    // 구글 로그인 성공 시 상태 업데이트
    googleLogin: (state, action) => {
      state.isLogged = true;
      state.data.token = action.payload.token;
      state.data.email = action.payload.email ?? "";
      saveToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    // 로그인 성공 시 처리
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("Login Success Payload:", action.payload); // 페이로드 로그
      state.isLogged = true;
      state.data.token = action.payload.data.token; // 토큰 업데이트
      state.data.email = action.payload.data.email;
      state.data.user_id = action.payload.data.user_id;
      state.status = action.payload.status;
      saveToLocalStorage(state);
    });
    

    // 로그인 실패 시 처리
    builder.addCase(loginUser.rejected, (state) => {
      state.isLogged = false;
      state.data.token = { atk: "", rtk: "" };
      state.data.email = "";
      state.data.user_id = 0;
    });

    // 로그아웃 성공 시 처리
    builder.addCase(logOutUser.fulfilled, (state) => {
      console.log("리듀서 로그아웃 fulfilled 처리 중..."); // 리듀서에서 로그아웃 성공 처리 확인
      state.isLogged = false;
      state.data.token = { atk: "", rtk: "" };
      state.data.email = "";
      state.data.user_id = 0;
    });

    // 카카오 로그인 성공 시 처리
    builder.addCase(kakaologinUser.fulfilled, (state, action) => {
      state.isLogged = true;
      state.data.token = action.payload.token;
      state.data.email = action.payload.email ?? "";
      state.data.user_id = 0;
      saveToLocalStorage(state);
    });

    // 카카오 로그인 실패 시 처리
    builder.addCase(kakaologinUser.rejected, (state) => {
      state.isLogged = false;
      state.data.email = "";
      state.data.user_id = 0;
    });

    // 구글 로그인 성공 시 처리
    builder.addCase(googleloginUser.fulfilled, (state, action) => {
      state.isLogged = true;
      state.data.token = action.payload.token;
      state.data.email = action.payload.email ?? "";
      saveToLocalStorage(state);
      state.data.user_id = 0;
    });

    // 구글 로그인 실패 시 처리
    builder.addCase(googleloginUser.rejected, (state) => {
      state.isLogged = false;
      state.data.email = "";
      state.data.user_id = 0;
    });
  },
});

// 액션과 리듀서 내보내기
export const { logout, loginSuccess } = userSlice.actions;
export default userSlice.reducer;
