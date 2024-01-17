import {useAuthContext} from "./useAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [error2, setError2] = useState(null);
    const [loading2, setIsLoading2] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setError2(null);
        setIsLoading2(true);

        const res = await fetch("https://crypto-endpoint.cyclic.app/api/user/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        const json = await res.json();

        if (!res.ok) {
            setError2(json.err);
            setIsLoading2(false);
        }

        if (res.ok) {
            localStorage.setItem("user" , JSON.stringify(json));
            dispatch({type: "LOGIN",  payload: json})
            setIsLoading2(false);
            setTimeout(() => {
                navigate("/portfolio");
            }, 1000);
        }

    }

    return { login, error2, setError2, loading2}
}