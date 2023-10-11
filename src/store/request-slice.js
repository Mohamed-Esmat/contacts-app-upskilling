import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    setRequest: (state, action) => {
      return action.payload;
    }
  }
});

export const requestActions = requestSlice.actions;
export default requestSlice.reducer;