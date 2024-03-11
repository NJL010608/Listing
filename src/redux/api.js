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
      dispatch(updateUserSuccess(user));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
  };
};
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteUserRequest());
      dispatch(deleteUserSuccess(userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      dispatch(deleteUserFailure(error.message));
    }
  };
};

