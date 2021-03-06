import { User } from './service';

export interface LoggedIn {
  type: 'LoggedIn';
  payload: {
    user: User;
  };
}

export interface LoggedOut {
  type: 'LoggedOut';
}

export type Action = LoggedIn | LoggedOut;

export interface State {
  phase: 'init' | 'notLoggedIn' | 'loggedIn';
  user?: User;
}

export const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LoggedIn':
      return {
        phase: 'loggedIn',
        user: action.payload.user,
      };
    case 'LoggedOut':
      return { phase: 'notLoggedIn' };
    default:
      return state;
  }
};
