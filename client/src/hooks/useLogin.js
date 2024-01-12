import {useAuthContext} from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
    const [error2, setError] = useState(null);
    const [isLoading2, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const res = await fetch("/api/user/login", {
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

    return { login, error2, isLoading2}
}