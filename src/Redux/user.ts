import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  data: {
    token: {
      atk: string;
    };
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  data: {
    token: {
      atk: '',
    },
  },
  status: 'idle'
};

export const logOutUser = createAsyncThunk(
  'user/logOut',
  async (payload: { userToken: string }) => {
    const response = await axios.post('/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Add reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.data = {
          token: {
            atk: '',
          },
        };
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;

