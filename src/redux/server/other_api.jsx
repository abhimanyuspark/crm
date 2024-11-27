import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_COUNTRY_URL;
// const apiUrl = "https://restcountries.com/v3.1/all";

export const getContryApi = createAsyncThunk("fetch/country", async () => {
  const response = await axios.get(apiUrl);
  return response.data.sort((a, b) =>
    a?.name?.common.localeCompare(b?.name?.common)
  );
});
