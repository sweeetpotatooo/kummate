/* eslint-disable @typescript-eslint/no-explicit-any */
// src/Redux/applicantReducer.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ApplyProps } from '../interface/interface'
import { updateApprove, updateDelete, updateRefuse } from '../components/Apply/applyApi'

// State 인터페이스 정의
interface State {
  posts: ApplyProps[]          // 전체 게시물 목록
  approvedPosts: ApplyProps[]  // 승인된 게시물 목록
  refusedPosts: ApplyProps[]   // 거절된 게시물 목록
  loading: boolean             // 비동기 작업 로딩 상태
  error: string | null         // 비동기 작업 에러 메시지
}

// 초기 상태 정의
const initialState: State = {
  posts: [],            // 게시물 초기 상태
  approvedPosts: [],    // 승인된 게시물 초기 상태
  refusedPosts: [],     // 거절된 게시물 초기 상태
  loading: false,
  error: null,
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
  ApplyProps, 
  ThunkArgApprove,
  { rejectValue: string }
>(
  'applicant/approvePost',  // 작업 이름
  async ({ userToken, otherUserId, articleId }: ThunkArgApprove, thunkAPI) => {
    try {
      const approvedPost = await updateApprove(userToken, otherUserId, articleId)  // 승인 API 호출
      return approvedPost
    } catch (error: any) {
      console.error('룸메이트 매칭 승인 오류', error)  // 오류 로그 출력
      return thunkAPI.rejectWithValue(error.message || '승인에 실패했습니다.')  // 오류 처리
    }
  }
)

// 거절 비동기 작업 정의
export const refusePostAsync = createAsyncThunk<
  ApplyProps, 
  ThunkArgRefuse,
  { rejectValue: string }
>(
  'applicant/refusePost',  // 작업 이름
  async ({ userToken, applyId, articleId }: ThunkArgRefuse, thunkAPI) => {
    try {
      const refusedPost = await updateRefuse(userToken, applyId, articleId)  // 거절 API 호출
      return refusedPost
    } catch (error: any) {
      console.error('룸메이트 매칭 거절 오류', error)  // 오류 로그 출력
      return thunkAPI.rejectWithValue(error.message || '거절에 실패했습니다.')  // 오류 처리
    }
  }
)

// 삭제 비동기 작업 정의
export const deletePostAsync = createAsyncThunk<
  number, 
  ThunkArgDelete,
  { rejectValue: string }
>(
  'applicant/deletePost',  // 작업 이름
  async ({ userToken, applyId }: ThunkArgDelete, thunkAPI) => {
    try {
      await updateDelete(userToken, applyId)  // 삭제 API 호출
      return applyId
    } catch (error: any) {
      console.error('룸메이트 현황 삭제 오류', error)  // 오류 로그 출력
      return thunkAPI.rejectWithValue(error.message || '삭제에 실패했습니다.')  // 오류 처리
    }
  }
)

// 슬라이스 정의 및 동기 액션 정의
const applicantSlice = createSlice({
  name: 'applicant',  // 슬라이스 이름
  initialState,         // 초기 상태 설정
  reducers: {
    // 동기 액션은 필요하지 않을 수 있음
  },
  extraReducers: (builder) => {
    // approvePostAsync
    builder.addCase(approvePostAsync.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(approvePostAsync.fulfilled, (state, action: PayloadAction<ApplyProps>) => {
      state.loading = false
      // 승인된 포스트를 posts에서 제거하고 approvedPosts에 추가
      state.posts = state.posts.filter(post => post.applyId !== action.payload.applyId)
      state.approvedPosts.push(action.payload)
    })
    builder.addCase(approvePostAsync.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || '승인 처리 중 오류가 발생했습니다.'
    })

    // refusePostAsync
    builder.addCase(refusePostAsync.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(refusePostAsync.fulfilled, (state, action: PayloadAction<ApplyProps>) => {
      state.loading = false
      // 거절된 포스트를 posts에서 제거하고 refusedPosts에 추가
      state.posts = state.posts.filter(post => post.applyId !== action.payload.applyId)
      state.refusedPosts.push(action.payload)
    })
    builder.addCase(refusePostAsync.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || '거절 처리 중 오류가 발생했습니다.'
    })

    // deletePostAsync
    builder.addCase(deletePostAsync.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(deletePostAsync.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false
      // 삭제된 포스트를 posts에서 제거
      state.posts = state.posts.filter(post => post.applyId !== action.payload)
    })
    builder.addCase(deletePostAsync.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || '삭제 처리 중 오류가 발생했습니다.'
    })
  },
})

// 슬라이스 리듀서 내보내기
export default applicantSlice.reducer 
