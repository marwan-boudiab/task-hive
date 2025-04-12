import { useState } from 'react';
import { TaskT } from '../../types';
import { useBoardsContext } from '../../hooks/useBoardsContext';
import { Clock, Pencil, Trash, User } from 'lucide-react';
import styles from './task.module.css';
import { deleteTask } from '../../services/api';
import { useAuthContext } from '../../hooks/useAuthContext';
import TaskForm from '../TaskForm';

// Defining the interface for Task props
interface TaskProps {
  task: TaskT; // Task object containing task details
  provided: any; // Draggable provided props for drag and drop functionality
  columnId: string; // Column ID for the task's column
}

// Defining the Task component
const Task = ({ task, provided, columnId }: TaskProps) => {
  const { dispatch } = useBoardsContext(); // Getting dispatch function from boards context
  const { user } = useAuthContext(); // Getting user information from authentication context

  // Destructuring task properties
  const { title, description, priority, deadline, image, assignee, tags } = task;
  const [, setError] = useState<string | null>(null); // State to handle error messages
  const [isHovered, setIsHovered] = useState(false); // State to track if the task is hovered
  const [modalOpen, setModalOpen] = useState(false); // State to track if the modal is open

  // Handlers for mouse enter and leave events
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Handler for deleting the task
  const handleDelete = () => {
    if (!user) {
      setError('You must be logged in');
      return;
    }
    setError(deleteTask(task, dispatch, columnId, user.token).toString());
  };

  // Handler for closing the modal
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div
        ref={provided.innerRef} // Reference for drag and drop functionality
        {...provided.draggableProps} // Draggable props for drag and drop functionality
        {...provided.dragHandleProps} // Drag handle props for drag and drop functionality
        onMouseEnter={handleMouseEnter} // Setting hover state to true on mouse enter
        onMouseLeave={handleMouseLeave} // Setting hover state to false on mouse leave
      >
        <div className={styles.wrapper}>
          <div className={styles.card}>
            {isHovered && (
              <div className={styles.card_header}>
                <div className={styles.controls_wrapper}>
                  <div className={styles.controls}>
                    <div className={styles.edit_btn} onClick={() => setModalOpen(true)}>
                      <Pencil className={styles.icon} />
                    </div>
                    <div className={styles.delete_btn} onClick={handleDelete}>
                      <Trash className={styles.icon} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {image && assignee && <img loading="lazy" src={image} alt={assignee} className={styles.image} />}

            <div className={styles.card_body}>
              {tags.length !== 0 && (
                <div className={styles.tags_container}>
                  {tags.map(tag => (
                    <span key={tag.title} className={styles.tag} style={{ backgroundColor: tag.color.bg, color: tag.color.text }}>
                      {tag.title}
                    </span>
                  ))}
                </div>
              )}
              <div className={styles.title_desc}>
                {/* Displaying task title */}
                <span className={styles.text}>{title}</span>
                {/* Displaying task description */}
                <span className={styles.description}>{description}</span>
              </div>
              {/* Separator line */}
              <div className={styles.separator}></div>
              <div className={styles.assignee}>
                <User className={styles.icon} />
                {/* Displaying task assignee */}
                <p className={styles.description}>{task.assignee}</p>
              </div>
              <div
                className={`${priority === 'High' ? 'text-priority-high' : priority === 'Medium' ? 'text-priority-mid' : 'text-priority-low'} ${styles.card_footer}`}
              >
                <div className={styles.deadline}>
                  <Clock className={styles.icon} />
                  {/* Displaying task deadline */}
                  <span>{deadline} mins</span>
                </div>
                <div
                  className={`${styles.priority} ${priority === 'High' ? 'bg-priority-high' : priority === 'Medium' ? 'bg-priority-mid' : 'bg-priority-low'}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && <TaskForm isOpen={modalOpen} onClose={closeModal} setOpen={setModalOpen} columnId={columnId} task={task} edit />}
    </>
  );
};

export default Task;
