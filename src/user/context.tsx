import React, { useEffect, useReducer, Context, Dispatch } from 'react';
import { userReducer, State, Action } from './reducer';
import * as service from './service';

const initialState: State = { phase: 'init' };

export const UserContext: Context<[State, Dispatch<Action>]> = React.createContext([
  initialState,
  (() => {}) as React.Dispatch<Action>,
]);

export const UserProvider: React.FC = props => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
    (async () => {
      const user = await service.self();

      if (!user) {
        dispatch({ type: 'LoggedOut' });
        return;
      }

      dispatch({ type: 'LoggedIn', payload: { user } });
    })();
  }, []);

  return (
    //CONSIDER: have separate providers for state and dispatch - state will get updated so infrequently that this probably doesn't matter
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
