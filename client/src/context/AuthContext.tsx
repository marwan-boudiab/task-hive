import { createContext, Dispatch, useReducer } from 'react';
import { useEffect } from 'react';

// Define the type for the authentication context
interface AuthContextType {
  user: any | null; // User object or null
  dispatch: Dispatch<any>; // Dispatch function for updating state
}

// Create the authentication context
export const AuthContext = createContext<AuthContextType | null>(null);

// Define the reducer function for authentication state management
export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }; // Set the user object in the state
    case 'LOGOUT':
      return { ...state, user: null }; // Clear the user object from the state
    default:
      return state; // Return the current state for unrecognized actions
  }
};

// Define the authentication context provider component
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Use reducer to manage authentication state
  const [state, dispatch] = useReducer(authReducer, {
    user: null, // Initial state with no user logged in
  });

  // Effect to initialize state from localStorage on component mount
  useEffect(() => {
    const user = localStorage.getItem('user'); // Get user data from localStorage
    if (user) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(user) }); // Dispatch LOGIN action to set user in state
    }
  }, []); // Run this effect only once on component mount

  console.log('AuthContext state: ', state);

  // Return the authentication context provider with value and children
  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
