//import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './UserSlice';

const store = configureStore({
  reducer: {
    UserReducer,
  },
});
export default store;
