import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const signUp = async (email, password) => {
        setError(null);
        setIsLoading(true);
        const res = await fetch("https://crypto-endpoint.cyclic.app/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const json = await res.json();

        if (!res.ok) {
            setError(json.err);
            setIsLoading(false);
        }

        if (res.ok) {
            localStorage.setItem("user", JSON.stringify(json));
            dispatch({ type: "LOGIN", payload: json })
            setIsLoading(false);
            setTimeout(() => {
                navigate("/portfolio");
            }, 1000);
        }

    }

    return { signUp, error, setError, loading }
}