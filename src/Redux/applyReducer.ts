// src/Redux/applyReducer.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { ApplyProps } from "../interface/interface"
import { API_URL, userMyFromApplicants, userMyToApplicants } from "../api"

interface ApplyState {
  applyStatus: boolean
  applyPosts: ApplyProps[]
  totalCount: number
  loading: boolean
  error: string | null
}

const initialState: ApplyState = {
  applyStatus: false,
  totalCount: 0,
  applyPosts: [],
  loading: false,
  error: null,
}

export const fetchData = createAsyncThunk<
  { applyPageList: ApplyProps[], totalCount: number },
  { showApply: boolean, currentPage: number, userToken: string },
  { rejectValue: string }
>(
  'apply/fetchData',
  async ({ showApply, currentPage, userToken }, thunkAPI) => {
    const apiEndpoint = `${API_URL}/api/${showApply ? userMyToApplicants : userMyFromApplicants}?page=${currentPage}&size=3`

    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })

      if (!response.ok) {
        const contentType = response.headers.get('Content-Type')
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json()
          throw new Error(errorData.message || `서버 상태 응답 ${response.status}`)
        } else {
          const errorText = await response.text()
          throw new Error(errorText || `서버 상태 응답 ${response.status}`)
        }
      }

      const responseData = await response.json()
      return { applyPageList: responseData.applyPageList, totalCount: responseData.totalCount }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || '데이터 가져오기 실패')
    }
  }
)

const applySlice = createSlice({
  name: 'apply',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<{ applyPageList: ApplyProps[], totalCount: number }>) => {
      state.loading = false
      state.applyPosts = action.payload.applyPageList
      state.totalCount = action.payload.totalCount
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string || '데이터 가져오기 실패'
    })
  },
})

export default applySlice.reducer
