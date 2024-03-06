//import { User } from '../reducer/UserInterface';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const DELETE_USER_SUCCESS = 'UPDATE_USER_FAILURE';

//GET
export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});
export const fetchUsersSuccess = (users: any) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
export const fetchUsersFailure = (error: any) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

//UPDATE
export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
});
export const updateUserSuccess = (user: any) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});
export const updateUserFailure = (error: any) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});
export const deleteUserSuccess = (user: any) => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
});

export const fetchUsers = () => async (dispatch: any) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const response = await fetch('https://randomuser.me/api/?results=50');
    const data = await response.json();
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data.results });
  } catch (error:any) {
    dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
  }
};

