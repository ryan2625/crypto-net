import {useAuthContext} from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signUp = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const res = await fetch("/api/user/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        const json = await res.json();

        if (!res.ok) {
            setError(json.err);
            setIsLoading(false);
        }

        if (res.ok) {
            localStorage.setItem("user" , JSON.stringify(json));
            dispatch({type: "LOGIN",  payload: json})
            setIsLoading(false);
        }

    }

    return { signUp, error, isLoading}
}