
import { configureStore } from '@reduxjs/toolkit'
//import { createStore, applyMiddleware } from 'redux';
//import thunkMiddleware from 'redux-thunk';
//import { useDispatch } from 'react-redux'
import UserReducer from './reducer/UserReducer';

const store = configureStore({
    reducer:{
        UserReducer,
    }
});

//export type AppDispatch = typeof store.dispatch // you can use this Dispatch type in your thunks
//export const useAppDispatch = () => useDispatch() // Export a hook that can be reused to resolve types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
