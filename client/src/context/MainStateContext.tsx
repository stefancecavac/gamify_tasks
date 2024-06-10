import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import { taskData } from "../models/Types";

type Action = 
  | { type: 'SET_TASKS'; payload: taskData[] }
  | { type: 'ADD_TASK'; payload: taskData }

interface ContextProps {
  tasks: taskData[];
  dispatch: Dispatch<Action>;
}

export const StateContext = createContext<ContextProps | undefined>(undefined);

export const StateReducer = (state: taskData[], action: Action): taskData[] => {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [...state, action.payload];
    default:
      return state;
  }
};

// Initial state
const initialState: taskData[] = [];

// Create the context provider component
export const StateContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(StateReducer, initialState);

  console.log(state);

  return (
    <StateContext.Provider value={{ tasks: state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
