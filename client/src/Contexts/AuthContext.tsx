//@ts-nocheck
import { createContext, useReducer, useEffect } from "react";

/**
 * @context AuthContext
 * 
 * This context is used to provide the user state and the actions of LOGIN and LOGOUT to the entire application. See index.
 * js for how it wraps the entire app.
 */

export interface User {
    user: {
        email: string | null;
        token: string | null;
    }
    dispatch: React.Dispatch
}

export const AuthContext = createContext<User>();

export const authReducer = (state, action) =>{
    switch(action.type){
        case "LOGIN":{
            return { user: action.payload}
        }
        case "LOGOUT": 
            return { user: null }
        default:
            return state
    }
}
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {


    const [state, dispatch] = useReducer(authReducer, {
        user: {
            email: null,
            token: null
        }
    })

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            dispatch({type: "LOGIN", payload: JSON.parse(user)})
        }
    }, [])

    console.log("AUTH STATE:", state)


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}