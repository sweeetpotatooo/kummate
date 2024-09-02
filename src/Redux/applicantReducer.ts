import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApplyProps } from '../interface/interface'
import { updateApprove, updateDelete, updateRefuse } from '../components/Apply/applyApi'

// State 인터페이스 정의
interface State {
  posts: ApplyProps[]          // 전체 게시물 목록
  approvedPosts: ApplyProps[]  // 승인된 게시물 목록
  refusedPosts: ApplyProps[]   // 거절된 게시물 목록
}

// 초기 상태 정의
const initialState: State = {
  posts: [],            // 게시물 초기 상태
  approvedPosts: [],    // 승인된 게시물 초기 상태
  refusedPosts: [],     // 거절된 게시물 초기 상태
}

// 승인 작업을 위한 Thunk 인자 인터페이스 정의
interface ThunkArgApprove {
  userToken: string       // 사용자 토큰
  otherUserId: number     // 상대 사용자 ID
  articleId: number       // 게시물 ID
}

// 거절 작업을 위한 Thunk 인자 인터페이스 정의
interface ThunkArgRefuse {
  userToken: string       // 사용자 토큰
  articleId: number       // 게시물 ID
  applyId: number         // 신청 ID
}

// 삭제 작업을 위한 Thunk 인자 인터페이스 정의
interface ThunkArgDelete {
  userToken: string       // 사용자 토큰
  applyId: number         // 신청 ID
}

// 승인 비동기 작업 정의
export const approvePostAsync = createAsyncThunk<
  boolean, 
  ThunkArgApprove
>(
  'applicant/approvePost',  // 작업 이름
  async ({ userToken, otherUserId, articleId }: ThunkArgApprove, thunkAPI) => {
    try {
      const approvedPost = await updateApprove(userToken, otherUserId, articleId)  // 승인 API 호출
      return approvedPost
    } catch (error) {
      console.error('룸메이트 매칭 승인 오류', error)  // 오류 로그 출력
      return thunkAPI.rejectWithValue(error)  // 오류 처리
    }
  }
)

// 거절 비동기 작업 정의
export const refusePostAsync = createAsyncThunk<
  boolean, 
  ThunkArgRefuse
>(
  'applicant/refusePost',  // 작업 이름
  async ({ userToken, applyId, articleId }: ThunkArgRefuse, thunkAPI) => {
    try {
      const refusedPost = await updateRefuse(userToken, applyId, articleId)  // 거절 API 호출
      return refusedPost
    } catch (error) {
      console.error('룸메이트 매칭 거절 오류', error)  // 오류 로그 출력
      return thunkAPI.rejectWithValue(error)  // 오류 처리
    }
  }
)

// 삭제 비동기 작업 정의
export const deletePostAsync = createAsyncThunk<
  boolean, 
  ThunkArgDelete
>(
  'applicant/deletePost',  // 작업 이름
  async ({ userToken, applyId }: ThunkArgDelete, thunkAPI) => {
    try {
      const deletedPost = await updateDelete(userToken, applyId)  // 삭제 API 호출
      return deletedPost
    } catch (error) {
      console.error('룸메이트 현황 삭제 오류', error)  // 오류 로그 출력
      return thunkAPI.rejectWithValue(error)  // 오류 처리
    }
  }
)

// 슬라이스 정의 및 동기 액션 정의
const applySlice = createSlice({
  name: 'applyAction',  // 슬라이스 이름
  initialState,         // 초기 상태 설정
  reducers: {
    // 승인 액션 정의
    approvePost: (state, action: PayloadAction<ApplyProps>) => {
      state.approvedPosts.push(action.payload)  // 승인된 게시물 목록에 추가
    },
    // 거절 액션 정의
    refusePost: (state, action: PayloadAction<ApplyProps>) => {
      state.refusedPosts.push(action.payload)  // 거절된 게시물 목록에 추가
    },
    // 삭제 액션 정의
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.applyId !== action.payload)  // 해당 게시물 목록에서 삭제
    }
  },
})

// 동기 액션 내보내기
export const { approvePost, refusePost, deletePost } = applySlice.actions

// 슬라이스 리듀서 내보내기
export default applySlice.reducer 
