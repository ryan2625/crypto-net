import {useAuthContext} from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const signUp = async (email, password) => {
        setError(null);

        const res = await fetch("/api/user/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        const json = await res.json();

        if (!res.ok) {
            setError(json.err);
        }

        if (res.ok) {
            localStorage.setItem("user" , JSON.stringify(json));
            dispatch({type: "LOGIN",  payload: json})
        }

    }

    return { signUp, error, setError}
}