import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * @hook useLogin
 * This function handles the logic of logging up to the database. It makes a POST request to the server with the user's 
 * email and password. If the request is successful, the user is logged in and redirected to the portfolio page. If the 
 * request is unsuccessful, the error is set to the error message from the server.
 * 
 * @returns {object} - An object containing the login function, error, setError, and loading state.
 */

export const useLogin = () => {
    const [error2, setError2] = useState<string | null>("");
    const [loading2, setIsLoading2] = useState<boolean>(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        setError2(null);
        setIsLoading2(true);

        const res = await fetch("https://crypto-api-epz8.onrender.com/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const json = await res.json();

        if (!res.ok) {
            setError2(json.err);
            setIsLoading2(false);
        }

        if (res.ok) {
            localStorage.setItem("user", JSON.stringify(json));
            dispatch({ type: "LOGIN", payload: json })
            setIsLoading2(false);
            setTimeout(() => {
                navigate("/portfolio");
            }, 1000);
        }

    }

    return { login, error2, setError2, loading2 }
}
