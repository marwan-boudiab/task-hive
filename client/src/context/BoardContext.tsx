//     case 'ADD_TASK':
//       return {
//         ...state,
//         [action.column]: {
//           ...state[action.column],
//           items: [...state[action.column].items, action.item], // Add a new task to the specified column
//         },
//       };
//     case 'UPDATE_TASK':
//       return {
//         ...state,
//         [action.column]: {
//           ...state[action.column],
//           items: state[action.column].items.map(item => {
//             if (item._id === action.item._id) {
//               return action.item; // Update the task if the IDs match
//             }
//             return item;
//           }),
//         },
//       };
//     case 'DELETE_TASK':
//       return {
//         ...state,
//         [action.column]: {
//           ...state[action.column],
//           items: state[action.column].items.filter(
//             item => !new Set([action.id]).has(item._id) // Remove the task with the specified ID
//           ),
//         },
//       };
//     default:
//       return state; // Return the current state for unknown actions
//   }
// };


import { createContext, useReducer } from 'react';
import { Action, Board } from '../types';
import { defaultBoardState } from '../utils/constants';

// Create a copy of the defaultBoardState using JSON serialization/deserialization
export const boardState = JSON.parse(JSON.stringify(defaultBoardState));

// Create the BoardContext with initial state and dispatch function
export const BoardContext = createContext<{
  state: Board; // The current state of the board
  dispatch: React.Dispatch<Action>; // Dispatch function for updating the state
}>({ state: boardState, dispatch: () => null });

// Define the reducer function for managing board state
const boardReducer = (state: Board, action: Action): Board => {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...action.payload }; // Set the board state to the provided payload
    case 'ADD_TASK': {
      const { column, item } = action;
      const columnItems = state[column]?.items || [];
      return {
        ...state,
        [column]: {
          ...state[column],
          items: [...columnItems, item], // Add a new task to the specified column
        },
      };
    }
    case 'UPDATE_TASK': {
      const { column, item } = action;
      const columnItems = state[column]?.items.map(existingItem =>
        existingItem._id === item._id ? item : existingItem
      ) || [];
      return {
        ...state,
        [column]: {
          ...state[column],
          items: columnItems, // Update the task in the specified column
        },
      };
    }
    case 'DELETE_TASK': {
      const { column, id } = action;
      const columnItems = state[column]?.items.filter(
        item => item._id !== id
      ) || [];
      return {
        ...state,
        [column]: {
          ...state[column],
          items: columnItems, // Remove the task from the specified column
        },
      };
    }
    default:
      return state; // Return the current state for unknown actions
  }
};

// Define the BoardContextProvider component
export const BoardContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Use the boardReducer and boardState to create the state and dispatch function
  const [state, dispatch] = useReducer(boardReducer, boardState);

  // Return the BoardContextProvider with the state and dispatch function provided as context values
  return <BoardContext.Provider value={{ state, dispatch }}>{children}</BoardContext.Provider>;
};
