import { api } from '@/shared';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface User {
  _id: string;
  email: string;
  role: string;
  avatar: string;
  username: string;
  middlename: string;
  confirmed: boolean;
  ban: {
    expiresAt: string;
    reason: string;
  };
  company: {
    address: string;
    name: string;
  };
}

interface initialState {
  user: User | null;
  status: 'loading' | 'success' | 'error';
}

const initialState: initialState = {
  user: null,
  status: 'loading',
};

export const getUser = createAsyncThunk<User>('user/getUser', async () => {
  const { data } = await api.get('/user');
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';
      })
      .addCase(getUser.rejected, state => {
        state.status = 'error';
      });
  },
});

export const userReducer = userSlice.reducer;
