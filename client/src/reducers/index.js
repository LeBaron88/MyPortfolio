import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const appReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MAIL_CONFIRMATION':
      return { ...state, contact: { mailConfirmation: action.payload } };
    case 'FETCH_CONFIG':
      return action.payload;
    case 'UPDATE_RESUME_STATUS':
      return { ...state, resume: action.payload };
    default:
      return state;
  }
};

const hideMenuReducer = (state = {}, action) => {
  switch (action.type) {
    case 'HIDE_MENU':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  form: formReducer,
  appData: appReducer,
  hMenu: hideMenuReducer
});
