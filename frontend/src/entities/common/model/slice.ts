import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  isSidebarVisible: boolean;
  searchQuery: string;
}

const initialState: CommonState = {
  isSidebarVisible: false,
  searchQuery: '',
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarVisible = !state.isSidebarVisible;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleSidebar, setSearchQuery } = commonSlice.actions;
export const selectSearchQuery = (state: { common: CommonState }) => state.common.searchQuery;
export const commonReducer = commonSlice.reducer;
