import { createSlice } from "@reduxjs/toolkit";
import { getContryApi } from "../server/other_api";

const initialState = {
  loading: false,
  error: null,
  country: [],
};

const countrySlice = createSlice({
  name: "country",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContryApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContryApi.fulfilled, (state, action) => {
        state.loading = false;
        state.country = action?.payload;
      })
      .addCase(getContryApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});

export default countrySlice.reducer;
