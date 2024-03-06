import { combineReducers } from 'redux';
import { UserState } from './UserInterface';
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, DELETE_USER_SUCCESS } from '../action/UserAction';


const initialState: UserState = {
  loading: false,
  users: [],
  error: '',
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: '',
      };
    case FETCH_USERS_FAILURE:
    case UPDATE_USER_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          users: state.users.map((user: any) =>
            user.id === action.payload.id ? action.payload : user
          ),
          error: '',
        };
        case DELETE_USER_SUCCESS:
          return {
            ...state,
            users: state.users.filter((user: any) => user.uuid !== action.payload),
          };

    default:
      return state;
  }
};

const UserReducer = combineReducers({
  users: userReducer,
});

export default UserReducer;
