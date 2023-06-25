import { State } from './PostsState';
import { Action } from './PostsAction';

export type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
