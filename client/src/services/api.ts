import { Action, TaskT } from '../types';

/**
 * Fetches the boards from the API and dispatches the action to set the boards in the state.
 *
 * @param dispatch - The dispatch function from React context to send actions.
 * @param token - The authentication token for API requests.
 * @returns A promise that resolves to null if successful, or an error message if an error occurs.
 */
const fetchBoards = async (dispatch: React.Dispatch<Action>, token: string): Promise<string | null> => {
  try {
    // Make the API request to fetch boards
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/boards/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is not OK
    if (!response.ok) {
      throw new Error(`Error fetching boards: ${response.statusText} (status: ${response.status})`);
    }
    // Parse the JSON response data
    const data = await response.json();
    // Dispatch an action to update the state with fetched boards
    dispatch({ type: 'SET_BOARD', payload: data.tasks });

    // Return null indicating no error
    return null;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching boards:', error);
    // Return the error message
    if (error instanceof Error) {
      return `Error fetching boards: ${error.message}`;
    } else {
      return 'Unknown error occurred';
    }
  }
};

/**
 * Adds a new task to a specified column and dispatches the action to add the task in the state.
 *
 * @param taskData - The data of the task to be added.
 * @param dispatch - The dispatch function from React context to send actions.
 * @param columnId - The ID of the column where the task should be added.
 * @param token - The authentication token for API requests.
 * @returns A promise that resolves to null if successful, or an error message if an error occurs.
 */
const addTask = async (taskData: any, dispatch: React.Dispatch<Action>, columnId: string, token: string): Promise<string | null> => {
  try {
    // Make the API request to add a new task
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/boards/${columnId}/task`, {
      method: 'POST',
      body: JSON.stringify(taskData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is not OK
    if (!response.ok) {
      throw new Error(`Error adding task: ${response.statusText} (status: ${response.status})`);
    }

    // Parse the JSON response data
    const data = await response.json();
    // Dispatch an action to update the state with the new task
    dispatch({ type: 'ADD_TASK', column: columnId, item: data.task });

    // Return null indicating no error
    return null;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('An error occurred while adding the task:', error);
    // Return a descriptive error message
    if (error instanceof Error) {
      return `An error occurred while adding the task: ${error.message}`;
    } else {
      return 'Unknown error occurred';
    }
  }
};

/**
 * Updates the tasks of the board and sends a PATCH request to the API.
 *
 * @param updatedColumns - The updated columns with tasks to be sent to the server.
 * @param token - The authentication token for API requests.
 * @returns A promise that resolves to null if successful, or an error message if an error occurs.
 */

const updateBoardTasks = async (updatedColumns: any, token: string): Promise<string | null> => {
  try {
    // Make the API request to update board tasks
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/boards/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tasks: updatedColumns }),
    });

    // Check if the response is not OK
    if (!response.ok) {
      throw new Error(`Error updating board tasks: ${response.statusText} (status: ${response.status})`);
    }

    // Return null indicating no error
    return null;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error updating board tasks:', error);
    // Return a descriptive error message
    if (error instanceof Error) {
      return `Error updating board tasks: ${error.message}`;
    } else {
      return 'Unknown error occurred';
    }
  }
};

/**
 * Updates a specific task in a column and dispatches the action to update the task in the state.
 *
 * @param taskData - The updated data of the task.
 * @param task - The task object to be updated.
 * @param dispatch - The dispatch function from React context to send actions.
 * @param columnId - The ID of the column where the task is located.
 * @param token - The authentication token for API requests.
 * @returns A promise that resolves to null if successful, or an error message if an error occurs.
 */
const updateTask = async (taskData: any, task: TaskT, dispatch: React.Dispatch<Action>, columnId: string, token: string): Promise<string | null> => {
  try {
    // Make the API request to update the task
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/boards/${columnId}/tasks/${task._id}`, {
      method: 'PATCH',
      body: JSON.stringify(taskData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response status is not OK
    if (!response.ok) {
      throw new Error(`Error updating task: ${response.statusText} (status: ${response.status})`);
    }

    // Parse the JSON response data
    const data = await response.json();
    // Dispatch an action to update the state with the updated task
    dispatch({ type: 'UPDATE_TASK', column: columnId, item: data.task });

    // Return null indicating no error
    return null;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('An error occurred while updating the task:', error);
    // Return a descriptive error message
    if (error instanceof Error) {
      return `An error occurred while updating the task: ${error.message}`;
    } else {
      return 'Unknown error occurred';
    }
  }
};

/**
 * Deletes a specific task from a column and dispatches the action to remove the task from the state.
 *
 * @param task - The task object to be deleted.
 * @param dispatch - The dispatch function from React context to send actions.
 * @param columnId - The ID of the column where the task is located.
 * @param token - The authentication token for API requests.
 * @returns A promise that resolves to null if successful, or an error message if an error occurs.
 */
const deleteTask = async (task: TaskT, dispatch: React.Dispatch<Action>, columnId: string, token: string): Promise<string | null> => {
  try {
    // Make the API request to delete the task
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/boards/${columnId}/tasks/${task._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response status is not OK
    if (!response.ok) {
      throw new Error(`Error deleting task: ${response.statusText} (status: ${response.status})`);
    }

    // Dispatch an action to update the state by removing the task
    dispatch({ type: 'DELETE_TASK', column: columnId, id: task._id });

    console.log('Task deleted successfully');
    // Return null indicating no error
    return null;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('An error occurred while deleting the task:', error);
    // Return a descriptive error message
    if (error instanceof Error) {
      return `An error occurred while deleting the task: ${error.message}`;
    } else {
      return 'Unknown error occurred';
    }
  }
};

export { fetchBoards, updateBoardTasks, updateTask, addTask, deleteTask };
