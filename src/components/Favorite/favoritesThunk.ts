import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../Redux/store"
import { API_URL, userMyFavorite } from '../../api'

export const fetchFavorites = createAsyncThunk('favorites/fetch', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState
  const userToken = state.user.data.token

  // 찜한 목록
  try {
    const response = await fetch(`${API_URL}/api/${userMyFavorite}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken.atk}`,
      },
    })

    if (!response.ok) {
      throw new Error(`서버 상태 응답 ${response.status}`)
    }

    const responseData = await response.json()

    return responseData.data
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue(error)
  }
})