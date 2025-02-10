import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, getFingerprint } from '@/shared';
import { SignInParams, SignInData } from '../ui/SignIn/model/types';
import { SignUpParams } from '../ui/SignUp/model/types';
import { RootState } from '@/app/model/store';
import { AxiosError } from 'axios';

export const fetchLogin = createAsyncThunk<SignInData, SignInParams>(
  'auth/fetchLogin',
  async (params: SignInParams) => {
    const fingerprint = await getFingerprint();
    const { data } = await api.post('auth/login', { ...params, fingerprint: fingerprint });
    return data;
  }
);
export const fetchRegister = createAsyncThunk<SignInData, SignUpParams>(
  'auth/fetchRegister',
  async (params, { rejectWithValue }) => {
    try {
      const fingerprint = await getFingerprint();
      const { data } = await api.post<SignInData>('auth/register', {
        ...params,
        fingerprint: fingerprint,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ code: string }>;
      return rejectWithValue(axiosError.response?.data?.code || 'Registration failed');
    }
  }
);
export const fetchPing = createAsyncThunk<SignInData>('auth/fetchPing', async () => {
  const fingerprint = await getFingerprint();
  const { data } = await api.post('auth/refresh', {
    refreshToken: localStorage.getItem('refreshToken'),
    fingerprint: fingerprint,
  });
  return data;
});

type AuthState = {
  data: SignInData | null;
  status: 'loading' | 'success' | 'error';
  error: string | null;
};

const initialState: AuthState = {
  data: null,
  status: 'loading',
  error: null as string | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.data = null;
      state.status = 'loading';
      window.localStorage.removeItem('refreshToken');
      window.location.reload();
    },
    updateAccessToken: (state, action) => {
      if (state.data) {
        state.data.accessToken = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLogin.pending, state => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
        window.localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchLogin.rejected, state => {
        state.status = 'error';
        state.data = null;
      });
    builder
      .addCase(fetchPing.pending, state => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchPing.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchPing.rejected, state => {
        state.status = 'error';
        state.data = null;
      });
    builder
      .addCase(fetchRegister.pending, state => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
        window.localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
        state.error = typeof action.payload === 'string' ? action.payload : 'Unknown error';
      });
  },
});
export const isAuthSelector = (state: RootState): boolean => Boolean(state.authReducer.data);
export const authReducer = authSlice.reducer;
export const { logout, updateAccessToken } = authSlice.actions;
