import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Define a custom hook to access the authentication context
export const useAuthContext = () => {
  // Access the authentication context using useContext hook
  const context = useContext(AuthContext);

  // Throw an error if the context is not available
  if (!context) throw new Error('useAuth must be used within a AuthContextProvider');

  // Return the context
  return context;
};
