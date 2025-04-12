import { updateBoardTasks } from '../../services/api';

// Define a function to handle drag and drop event
export const onDragEnd = (result: any, columns: any, setColumns: any, token: string) => {
  // If there is no destination, exit the function
  if (!result.destination) return;
  const { source, destination } = result; // Extract source and destination from the result

  // If the source and destination columns are different
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]; // Get the source column
    const destColumn = columns[destination.droppableId]; // Get the destination column
    const sourceItems = [...sourceColumn.items]; // Copy source column items
    const destItems = [...destColumn.items]; // Copy destination column items
    const [toBeRemoved] = sourceItems.splice(source.index, 1); // Remove the dragged item from the source
    destItems.splice(destination.index, 0, toBeRemoved); // Insert the dragged item into the destination
    // console.log(toBeRemoved._id);
    // console.log(destination.droppableId);

    // Update the board tasks on the server
    updateBoardTasks(
      {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      },
      token
    );

    // Update the local state of columns
    setColumns({
      type: 'SET_BOARD',
      payload: {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      },
    });
  } else {
    // If the source and destination columns are the same
    const column = columns[source.droppableId]; // Get the column
    const copiedItems = [...column.items]; // Copy the column items
    const [toBeRemoved] = copiedItems.splice(source.index, 1); // Remove the dragged item
    // updateTask(toBeRemoved, { index: destination.index }, setColumns);
    copiedItems.splice(destination.index, 0, toBeRemoved); // Insert the dragged item to the new position

    // Update the board tasks on the server
    updateBoardTasks(
      {
        ...columns,
        [source.droppableId]: { ...column, items: copiedItems },
      },
      token
    );

    // Update the local state of columns
    setColumns({
      type: 'SET_BOARD',
      payload: {
        ...columns,
        [source.droppableId]: { ...column, items: copiedItems },
      },
    });
  }
};
