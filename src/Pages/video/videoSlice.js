import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: {},
  loading: false,
  savedVideos: [],
  error: false,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    fetchSavedSuccess: (state, action) => {
      state.loading = false;
      state.savedVideos = action.payload;
      
    },
    fetchSavedFailed: (state)=> {
      state.loading = false;
      state.error = true;
    }
    
  },
})
    
export const { fetchStart, fetchSuccess, fetchFailure, save, fetchSavedFailed, fetchSavedSuccess } =
  videoSlice.actions;

export default videoSlice.reducer;
