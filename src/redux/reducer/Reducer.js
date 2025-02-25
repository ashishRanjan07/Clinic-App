import {LOGIN, SAVE_DATA, SAVE_USER_INFO} from '../action/Action';

const initialState = {
  isLoggedIn: 'No',
  saveData: 'null',
  saveUserInfo: 'null',
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SAVE_DATA:
      return {
        ...state,
        saveData: action.payload,
      };
    case SAVE_USER_INFO:
      return {
        ...state,
        saveUserInfo: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
