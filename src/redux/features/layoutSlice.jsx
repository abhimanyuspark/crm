import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const sidebarCookie = Cookies.get("sidebar");
const themeCookie = Cookies.get("theme");

const initialState = {
  side: sidebarCookie ? JSON.parse(sidebarCookie) : true,
  theme: themeCookie ? JSON.parse(themeCookie) : true,
  expand: false,
  menu: false,
};

const lauOutSlice = createSlice({
  name: "lauout",
  initialState,
  reducers: {
    toggleSide: (state, action) => {
      state.side = action?.payload;
      Cookies.set("sidebar", JSON.stringify(action?.payload), { expires: 7 });
    },
    toggleTheme: (state, action) => {
      state.theme = action?.payload;
      Cookies.set("theme", JSON.stringify(action?.payload), { expires: 7 });
    },
    toggleExpand: (state, action) => {
      state.expand = action?.payload;
    },
    toggleMenu: (state, action) => {
      state.menu = action?.payload;
    },
  },
});

// Actions
export const { toggleSide, toggleTheme, toggleExpand, toggleMenu } =
  lauOutSlice.actions;
// Reducer
export default lauOutSlice.reducer;
