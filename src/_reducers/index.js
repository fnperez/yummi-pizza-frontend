import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  auth,
  registration,
  alert
});

export default rootReducer;