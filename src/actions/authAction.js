// Action Types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const login = (username) => ({
  type: LOGIN,
  payload: username,
});

export const logout = () => ({
  type: LOGOUT,
});
