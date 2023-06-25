import { User } from './User';

export type UserAction =
  | { type: 'add/user'; payload: User }
  | { type: 'check/user'; payload: User }
  | { type: 'del/user' };
