import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  users: [],
  ascending: true,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = '';
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.ascending = true;
      state.error = '';
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
    },
    updateUser: (state, action) => {
        state.users= state.users.map((user) =>
            user.login.uuid === action.payload.login.uuid ? action.payload : user
        )
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.login.uuid !== action.payload);
    },
    sortUsers: (state) => {
      const sortedUsers = [...state.users].sort((a, b) => {
        if (state.ascending) {
          return a.name.first.localeCompare(b.name.first);
        } else {
          return b.name.first.localeCompare(a.name.first);
        }
      });
      state.users = sortedUsers;
      state.ascending = !state.ascending;
    },
  },
});

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure, updateUser, deleteUser, sortUsers } = userSlice.actions;

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const response = await axios.get('https://randomuser.me/api/?results=50');
      dispatch(fetchUsersSuccess(response.data.results));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

export default userSlice.reducer;
