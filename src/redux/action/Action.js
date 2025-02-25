// Actions
export const LOGIN = 'LOGIN';
export const SAVE_DATA = 'SAVE_DATA';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';

// Action Creator
export const login = data => ({
  type: LOGIN,
  payload: data,
});

export const saveData = data => ({
  type: SAVE_DATA,
  payload: data,
});

export const saveUserData = data => ({
  type: SAVE_USER_INFO,
  payload: data,
});
