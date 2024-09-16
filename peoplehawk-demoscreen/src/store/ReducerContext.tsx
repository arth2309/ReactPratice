import {createContext,Dispatch,FC, ReactNode, useContext, useReducer} from 'react';
import { apiReducer,intialState,Action } from './Reducer';
import { CandidateDetail } from '../interface/Interface';

const ReducerContext = createContext<{state : CandidateDetail,dispatch : Dispatch<Action>} | undefined>(undefined);

export const ReducerProvider : FC<{children : ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(apiReducer, intialState);
    return (
        <ReducerContext.Provider value={{ state, dispatch }}>
          {children}
        </ReducerContext.Provider>
      );
}

export const useApi = () => {
    const context = useContext(ReducerContext);
    if (!context) {
      throw new Error('useMemberAnalytics must be used within a MemberAnalyticsProvider');
    }
    return context;
  };