import {  configureStore } from "@reduxjs/toolkit";
import requestReducer from './request-slice';

const store = configureStore({
  reducer: {
    request: requestReducer
  }
});

export default store