import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { TaskT } from '../../types';
import { onDragEnd } from '../../utils/helpers/onDragEnd';
import Task from '../../components/Task';
import { useBoardsContext } from '../../hooks/useBoardsContext';
import { Plus } from 'lucide-react';
import styles from './board.module.css';
import { fetchBoards } from '../../services/api';
import { allowedKeys } from '../../utils/constants';
import { useAuthContext } from '../../hooks/useAuthContext';
import TaskForm from '../../components/TaskForm';
// import { getClasses } from './board.styles';

const Board = () => {
  const { state, dispatch } = useBoardsContext();
  const { user } = useAuthContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBoards = async () => {
      setIsLoading(true);
      if (user) {
        await fetchBoards(dispatch, user.token);
      }
      setIsLoading(false);
    };
    
    loadBoards();
  }, [dispatch, user]);

  const openModal = (columnId: string) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // todo: export classes to external files
  // const classes = getClasses()

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className="flex items-center justify-center w-full h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
            </div>
            <p className="text-white text-sm font-medium animate-pulse">Loading your tasks...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={(result: any) => onDragEnd(result, state, dispatch, user.token)}>
        <div className={styles.wrapper}>
          {Object.entries(state)
            .filter(([columnId]) => allowedKeys.includes(columnId))
            .map(([columnId, column]: any) => (
              <div className={styles.board_column} key={columnId}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided: any) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className={styles.droppable_area}>
                      <div className="w-full">
                        <div className={styles.column_title}>{column.name}</div>
                        {column.items?.map((task: TaskT, index: any) => (
                          <Draggable key={task._id.toString()} draggableId={task._id.toString()} index={index}>
                            {(provided: any) => <Task provided={provided} task={task} columnId={columnId} />}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
                <div onClick={() => openModal(columnId)} className={styles.btn}>
                  <Plus className={styles.icon} />
                  Add Task
                </div>
              </div>
            ))}
        </div>
      </DragDropContext>

      <TaskForm isOpen={modalOpen} onClose={closeModal} setOpen={setModalOpen} columnId={selectedColumn} />
    </>
  );
};

export default Board;
