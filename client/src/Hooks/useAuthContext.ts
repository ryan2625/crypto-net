import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";

/**
 * @hook useAuthContext
 * This hook returns the AuthContext. It is used to access the user state and the actions of LOGIN and LOGOUT from the 
 * AuthContext reducer.
 * 
 * @returns {object} - An object containing the AuthContext.
 
 */

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
}

export default useAuthContext;