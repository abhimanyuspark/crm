import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/features/reduxLogin";
import layoutSlice from "../redux/features/layoutSlice";
import usersSlice from "../redux/features/roleUsers";
import countrySlice from "../redux/features/countryReducer";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    layout: layoutSlice,
    users: usersSlice,
    country: countrySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
