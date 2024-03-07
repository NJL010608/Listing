import axios from 'axios';
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure, updateUserRequest, updateUserSuccess, updateUserFailure, deleteUserSuccess, deleteUserRequest, deleteUserFailure} from './action/UserAction';


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


export const updateUser = (user) => {
  return (dispatch) => {
    dispatch(updateUserRequest());
    try {
      // Simulate API call delay
      setTimeout(() => {
        dispatch(updateUserSuccess(user));
      }, 1000);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
  };
};
};

export const deleteUser = (userIds) => {
  return async (dispatch) => {
    try {
      dispatch(deleteUserRequest());
      dispatch(deleteUserSuccess(userIds));
    } catch (error) {
      console.error('Error deleting user:', error);
      dispatch(deleteUserFailure(error.message));
    }
  };
};

/*
export const deleteUser = (user) => {
  return async (dispatch: any) => {
    try {
      // Dispatch an action to update Redux store
      dispatch(deleteUserSuccess(user));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
};
*/

