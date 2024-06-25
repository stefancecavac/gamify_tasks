import React, { useContext } from "react";
import { userData } from "../models/Types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, loginUser, logoutUser, registerUser } from "../api/authApi";


type AuthContext = {
    user: userData,
    logout: () => void,
    login: (data:userData) => void,
    register: (data:userData) => void

}

export const AuthContext = React.createContext<AuthContext | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient()

    const { data: user } = useQuery({
        queryKey: ['auth'],
        queryFn: fetchUser,
        retry: false
    })

    const { mutate: logout } = useMutation({
        mutationKey: ['auth'],
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: ['auth']
            })
        }
    })

    const { mutate: login } = useMutation({
        mutationKey: ['auth'],
        mutationFn: loginUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['auth']
            })
        }
    })

    const { mutate:register } = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['auth']
            })
        }
    })




    console.log(user)

    return (
        <AuthContext.Provider value={{ user, logout ,login, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UseAuthContext = () => {
    const context = useContext(AuthContext)
    return context as AuthContext
}