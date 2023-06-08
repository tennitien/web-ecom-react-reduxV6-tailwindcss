import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API;
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await axios.get(BASE_URL);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const dataSelector = {
  data: state => state.data.data,
  loading: state => state.data.loading,
  error: state => state.data.error,
};
export default dataSlice.reducer;
