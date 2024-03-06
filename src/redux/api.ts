import axios from 'axios';
import { User } from './reducer/UserInterface';
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure, updateUserRequest, updateUserSuccess, updateUserFailure, deleteUserSuccess} from './action/UserAction';


export const fetchUsers = () => async (dispatch: any) => {
  dispatch(fetchUsersRequest);
  try {
    const response = await fetch('https://randomuser.me/api/?results=50');
    const data = await response.json();
    dispatch( fetchUsersSuccess, data.results );
  } catch (error:any) {
    dispatch( fetchUsersFailure, error.message );
  }
};


export const updateUser = (user: User) => {
  return (dispatch: any) => {
    dispatch(updateUserRequest());
    
    try {
      // Simulate API call delay
      setTimeout(() => {
        dispatch(updateUserSuccess(user));
      }, 1000);
    } catch (error:any) {
      dispatch(updateUserFailure(error.message));
  };
};
};


export const deleteUser = (user: any) => {
  return async (dispatch: any) => {
    try {
      // Dispatch an action to update Redux store
      dispatch(deleteUserSuccess(user));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
};

/*
export const updateUser = (userId: string, updatedUserData: any) => {
  return async (dispatch: any) => {
    try {
      // Make a PUT request to update the user data
      await axios.put(`https://your-api-url/users/${userId}`, updatedUserData);
      // After successfully updating the data, dispatch an action to indicate the update
      dispatch(updateUserSuccess(updatedUserData));
    } catch (error) {
      // If there's an error, dispatch an action to handle the failure
      dispatch(updateUserFailure(error.message));
    }
  };
};
*/
/*
export const deleteUser = (users: User[]) => async (dispatch: any) => {
  try {
    // Delete users from API
    for (const user of users) {
      await fetch(`https://yourapi.com/users/${user.uuid}`, {
        method: 'DELETE',
      });
    }
    dispatch({ type: deleteUserSuccess, payload: users });
  } catch (error) {
    console.error('Error deleting users:', error);
  }
};
*/


