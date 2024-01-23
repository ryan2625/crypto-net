import { useAuthContext } from "./useAuthContext";

/**
 * @hook useLogout
 * This function handles the logic of logging out of the application. It removes the user from local storage and dispatches the logout action to the reducer.
 * @returns {object} - An object containing the logout function.
 */

export const useLogout = () => {
    
    const { dispatch } = useAuthContext();

    const logout = () => {
        localStorage.removeItem("user");
        dispatch({type: "LOGOUT"})
    }
    
    return { logout }
}