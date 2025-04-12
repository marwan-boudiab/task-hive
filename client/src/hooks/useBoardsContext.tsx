import { useContext } from 'react';
import { BoardContext } from '../context/BoardContext';

// Define a custom hook to access the board context
export const useBoardsContext = () => {
  // Access the board context using useContext hook
  const context = useContext(BoardContext);

  // Throw an error if the context is not available
  if (!context) throw new Error('useBoardsContext must be used within a BoardContextProvider');

  // Return the context
  return context;
};
