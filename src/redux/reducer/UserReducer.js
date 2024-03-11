import { combineReducers } from 'redux';
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, DELETE_USER_SUCCESS, DELETE_USER_REQUEST, DELETE_USER_FAILURE } from '../action/UserAction';

const initialState = {
  loading: false,
  users: [],
  error: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
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
          users: state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
          error: '',
        };
        case DELETE_USER_SUCCESS:
          return {
            ...state,
            loading: false,
            users: state.users.filter((user) => user.login.uuid !== action.payload),
          };
        case DELETE_USER_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };

    default:
      return state;
  }
};

const UserReducer = combineReducers({
  users: userReducer,
});

export default UserReducer;
