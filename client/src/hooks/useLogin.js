import {useAuthContext} from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
    const [error2, setError2] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError2(null);

        const res = await fetch("https://crypto-endpoint.cyclic.app/api/user/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        const json = await res.json();

        if (!res.ok) {
            setError2(json.err);
        }

        if (res.ok) {
            localStorage.setItem("user" , JSON.stringify(json));
            dispatch({type: "LOGIN",  payload: json})
        }

    }

    return { login, error2, setError2}
}