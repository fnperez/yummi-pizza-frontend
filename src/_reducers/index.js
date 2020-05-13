import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { singUp } from './sign-up.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  auth,
  singUp,
  alert
});

export default rootReducer;