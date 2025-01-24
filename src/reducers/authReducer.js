import { LOGIN, LOGOUT } from '../actions/authAction';

// Initial state
const initialState = {
  isAuthenticated: false,
  username: null,
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        username: null,
      };
    default:
      return state;
  }
};

export default authReducer;
