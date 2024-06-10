import React, { createContext, useReducer, Dispatch, useEffect, ReactNode } from "react";
import { registerData } from "../models/Types";

type User = registerData | null;

type Action = 
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT' };

interface ContextProps {
    user: User;
    dispatch: Dispatch<Action>;
}

export const UserContext = createContext<ContextProps | null>(null);

export const UserReducer = (state: User, action: Action): User => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
};

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user) {
                dispatch({ type: 'LOGIN', payload: user });
            }
        }
    }, []);

    console.log(state)

    return (
        <UserContext.Provider value={{ user: state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
