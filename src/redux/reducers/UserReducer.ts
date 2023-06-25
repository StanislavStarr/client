import { UserAction } from '../../types/UserAction';
import { UserState } from '../../types/UserState';

export const initState: UserState = {
  user: undefined,
};

const reducer = (
  state: UserState = initState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case 'add/user':
      return { ...state, user: action.payload };
    case 'check/user':
      return { ...state, user: action.payload };
    case 'del/user':
      return { ...state, user: undefined };
    default:
      return state;
  }
};

export default reducer;
