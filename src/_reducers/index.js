import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { singUp } from './sign-up.reducer';
import { alert } from './alert.reducer';
import { catalog } from './catalog.reducer'

const rootReducer = combineReducers({
  auth,
  singUp,
  alert,
  catalog
});

export default rootReducer;