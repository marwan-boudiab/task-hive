import { useAuthContext } from './useAuthContext';
import { useBoardsContext } from './useBoardsContext';

// Define a custom hook for user logout functionality
export const useLogout = () => {
  // Access the authentication context using the useAuthContext hook
  const { dispatch } = useAuthContext();

  // Access the boards context using the useBoardsContext hook
  const { dispatch: boardsDispatch } = useBoardsContext();
  const logout = () => {
    // Remove user information from local storage
    localStorage.removeItem('user');

    // Update authentication context by dispatching a LOGOUT action
    dispatch({ type: 'LOGOUT' });

    // Update boards context by dispatching a SET_BOARD action with null payload
    boardsDispatch({ type: 'SET_BOARD', payload: null });
  };

  // Return the logout function
  return { logout };
};
