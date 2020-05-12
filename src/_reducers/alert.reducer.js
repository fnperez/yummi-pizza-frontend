import { alertConstants } from '../_constants';

export function alert(state = {visible: false}, action) {
  switch (action.type) {
    case alertConstants.SHOW_SUCCESS:
        return {
            color: 'green',
            visible: true,
            ...action.props,
        };
    case alertConstants.SHOW_WARNING:
        return {
            color: 'yellow',
            visible: true,
            ...action.props,
        };
    case alertConstants.SHOW_ERROR:
        return {
            color: 'red',
            visible: true,
            ...action.props,
        };
    case alertConstants.CLOSE:
        return state;
    default:
      return state
  }
}