import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// Define a custom hook for user signup functionality
export const useSignup = () => {
  // State variables for error message and loading state
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Access the authentication context using the useAuthContext hook
  const { dispatch } = useAuthContext();

  // Function to handle user signup
  const signup = async (email: string, password: string) => {
    // Set loading state and clear previous error message
    setIsLoading(true);
    setError(null);

    // Send a POST request to the signup endpoint
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password /*returnSecureToken: true*/ }),
    });

    // Parse the JSON response
    const json = await response.json();

    // Handle errors if the response is not OK
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    // If the response is OK, save the user information to local storage and update the authentication context
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json)); // Save user to local storage
      dispatch({ type: 'LOGIN', payload: json }); // Update auth context
      setIsLoading(false);
    }
  };

  // Return the signup function, error message, and loading state
  return { signup, error, isLoading };
};
