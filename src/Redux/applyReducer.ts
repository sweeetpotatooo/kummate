import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { ApplyProps } from "../interface/interface"
import { userMyFromApplicants, userMyToApplicants } from "../api"

// ApplyState 인터페이스 정의
interface ApplyState {
  applyStatus: boolean          // 신청 상태를 나타내는 boolean 값
  applyPosts: ApplyProps[]      // 신청된 게시물 목록
  totalCount: number            // 총 게시물 수
}

// 초기 상태 정의
const initialState: ApplyState = {
  applyStatus: false,           // 초기 상태는 신청되지 않음으로 설정
  totalCount: 0,                // 총 게시물 수 초기값 0
  applyPosts: [],               // 게시물 목록 초기값 빈 배열
}

// 비동기 작업 정의: fetchData
export const fetchData = createAsyncThunk<
  { applyPageList: ApplyProps[], totalCount: number },  // 반환값 타입
  { showApply: boolean, currentPage: number, userToken: string }  // 인자 타입
>(
  'apply/fetchData',  // 작업 이름
  async ({ showApply, currentPage, userToken }, thunkAPI) => {
    // 요청할 API 엔드포인트 결정
    const apiEndpoint = `/api/${showApply ? userMyToApplicants : userMyFromApplicants}?page=${currentPage}&size=3`

    try {
      // API 요청
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken
        },
      })

      // 응답 상태 체크
      if (!response.ok) {
        throw new Error(`서버 상태 응답 ${response.status}`)  // 오류 발생 시 예외 처리
      }

      // 응답 데이터를 JSON으로 변환
      const responseData = await response.json()
      return { applyPageList: responseData.data.applyPageList, totalCount: responseData.data.totalCount }
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: `서버 상태 응답: ${error}` })  // 예외 발생 시 처리
    }
  }
)

// 슬라이스 정의
const applySlice = createSlice({
  name: 'apply',           // 슬라이스 이름
  initialState,            // 초기 상태 설정
  reducers: {},            // 동기 액션이 없는 슬라이스
  extraReducers: (builder) => {
    // fetchData 작업이 성공적으로 완료된 경우
    builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<{ applyPageList: ApplyProps[], totalCount: number }>) => {
      state.applyPosts = action.payload.applyPageList  // 신청된 게시물 목록 상태 업데이트
      state.totalCount = action.payload.totalCount     // 총 게시물 수 상태 업데이트
    })
  },
})

// 슬라이스 리듀서 내보내기
export default applySlice.reducer
