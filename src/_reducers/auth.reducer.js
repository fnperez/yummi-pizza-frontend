import { authConstants } from '../_constants';

const initState = {
  token: localStorage.getItem('accessToken')
};

export function auth(state = initState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loading: true,
      };
    case authConstants.LOGIN_SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case authConstants.LOGIN_SET_USER:
      state.loggingIn = false;
      
      return {
        ...state,
        currentUser: action.user,
        loggedIn: true
      };
    case authConstants.LOGIN_FAILURE:
      return {
        error: action.error
      };
    case authConstants.ME_REQUEST:
      return {
        loggingIn: true,
      }
    case authConstants.LOGOUT:
      return {};
    default:
      return state
  }
}