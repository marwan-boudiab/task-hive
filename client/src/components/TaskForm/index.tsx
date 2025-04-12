import { useEffect, useState } from 'react';
import { initialTaskData, validFileTypes } from '../../utils/constants';
import { addTask, updateTask } from '../../services/api';
import { useBoardsContext } from '../../hooks/useBoardsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './form.module.css';
import { TaskT, Tag } from '../../types';
import { FileImage, ShieldAlert, Tags, Trash } from 'lucide-react';
import { generateUniqueFileName } from '../../utils/helpers/generateUniqueFileName';
import { getRandomColors } from '../../utils/helpers/getRandomColors';
import { deleteImageFromFirebase, uploadImageToFirebase } from '../../utils/firebase/storage';
import Dropdown from '../ui/Select';

// Defining Props type for the component
type Props = {
  isOpen: boolean; // Boolean to control if the modal is open
  onClose: () => void; // Function to close the modal
  setOpen: React.Dispatch<React.SetStateAction<boolean>>; // State setter for modal open state
  columnId: string; // ID of the column the task belongs to
  edit?: boolean; // Optional boolean to indicate if it is edit mode
  task?: TaskT; // Optional task data for editing
};

// TaskForm component definition
const TaskForm = ({ isOpen, onClose, setOpen, columnId, edit = false, task }: Props) => {
  const { dispatch } = useBoardsContext(); // Getting dispatch function from boards context
  const { user } = useAuthContext(); // Getting user information from authentication context

  const [taskData, setTaskData] = useState(task ? task : initialTaskData); // State for task data, initialized with either passed task or initial task data
  const [tagTitle, setTagTitle] = useState(''); // State for tag title
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [submitting, setSubmitting] = useState(false); // State for submitting status
  const [uploadingImg, setUploadingImg] = useState(false); // State to track image uploading status
  const [tempImageFile, setTempImageFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  // useEffect to update task data when the task prop changes
  useEffect(() => {
    setTaskData(task ? task : initialTaskData);
  }, [task]);

  // Function to close the modal and reset states
  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    onClose();
    setTaskData(task ? task : initialTaskData);
    setTagTitle('');
    setError(null);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData((prevTaskData: any) => ({
      ...prevTaskData,
      [name]: value,
      state: columnId,
    }));
  };

  const handleRemoveImage = () => {
    setRemoveImage(true);
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!validFileTypes.includes(file.type)) {
        setError('File must be in JPG/PNG format');
        return;
      }

      setTempImageFile(file);
    }
  };

  const submitForm = async () => {
    let updatedTaskData = taskData;
    let removeImagelocal = removeImage;

    // Upload image
    if (tempImageFile) {
      try {
        if (taskData.image) {
          try {
            await deleteImageFromFirebase(taskData.image);
            updatedTaskData = { ...taskData, image: '' };
          } catch (err) {
            setError('Failed to remove image before uploading');
            return;
          }
        }
        setUploadingImg(true);
        const fileName = generateUniqueFileName(tempImageFile);
        const downloadURL = await uploadImageToFirebase(tempImageFile, fileName);
        updatedTaskData = { ...taskData, image: downloadURL };
      } catch (err) {
        setError('Failed to upload image');
        return;
      } finally {
        setUploadingImg(false);
        removeImagelocal = false;
      }
    }

    // Remove image
    if (removeImagelocal && updatedTaskData.image) {
      try {
        await deleteImageFromFirebase(updatedTaskData.image);
        updatedTaskData = { ...taskData, image: '' };
      } catch (err) {
        setError('Failed to remove image after uploading');
        return;
      }
    }

    // Handle form submission
    setSubmitting(true);
    if (!user) {
      setError('You must be logged in');
      return;
    }

    if (
      !(
        updatedTaskData.title.trim() &&
        updatedTaskData.description.trim() &&
        updatedTaskData.priority &&
        updatedTaskData.deadline &&
        updatedTaskData.assignee!.trim()
      )
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    // Set error to the result of addTask or updateTask function call and close the modal
    setError(
      !edit
        ? addTask(updatedTaskData, dispatch, columnId, user.token).toString()
        : updateTask(updatedTaskData, task!, dispatch, columnId, user.token).toString()
    );
    setSubmitting(false);
    setTempImageFile(null);
    setRemoveImage(false);
    closeModal();
  };

  // Handle adding a new tag
  const handleAddTag = () => {
    if (tagTitle.trim() !== '') {
      const {
        color: { bg, text },
      } = getRandomColors(); // Get random colors for the tag
      const newTag: Tag = { title: tagTitle.trim(), color: { bg, text } }; // Create a new tag object
      setTaskData({ ...taskData, tags: [...taskData.tags, newTag] }); // Update task data with the new tag
      setTagTitle(''); // Clear the tag title input
    }
  };

  // Handle deleting a tag
  const handleTagDelete = (indexToRemove: number) => {
    const updatedTags = taskData.tags.filter((_tag: Tag, index: number) => index !== indexToRemove); // Filter out the tag to be removed
    setTaskData({ ...taskData, tags: updatedTags }); // Update task data with the updated tags
  };

  // Handle priority selection
  const handlePrioritySelect = (selectedOption: any) => setTaskData({ ...taskData, priority: selectedOption });

  return (
    <div className={`${styles.wrapper} ${isOpen ? styles.visible : styles.not_visible}`}>
      <div className={styles.modal_bg} onClick={closeModal}></div>
      <div className={styles.modal}>
        <h1 className={styles.heading}>{edit ? 'Edit Task' : 'Add Task'}</h1>
        <input type="text" name="title" value={taskData.title} onChange={handleChange} placeholder="Title *" className={styles.input} />
        <input type="text" name="description" value={taskData.description} onChange={handleChange} placeholder="Description *" className={styles.input} />
        <Dropdown onSelect={handlePrioritySelect} label="Select a priority *" selected={taskData.priority} />
        <input type="text" name="assignee" value={taskData.assignee} onChange={handleChange} placeholder="Assignee *" className={styles.input} />
        <div className={styles.row}>
          <input type="number" name="deadline" value={taskData.deadline} onChange={handleChange} placeholder="Deadline in minutes *" className={styles.input} />
          <input type="text" value={tagTitle} onChange={e => setTagTitle(e.target.value)} placeholder="Tag Title *" className={styles.input} />
        </div>
        <div className={styles.row}>
          <label htmlFor="image-upload" className={styles.btn}>
            <input type="file" id="image-upload" name="image" onChange={handleImageChange} className="hidden" />
            {!uploadingImg ? `${taskData.image ? 'Change Image' : 'Add Image'}` : 'Uploading...'}
            <span>
              <FileImage className={styles.icon} />
            </span>
          </label>
          <button className={styles.btn} onClick={handleAddTag}>
            Add Tag
            <span>
              <Tags className={styles.icon} />
            </span>
          </button>
        </div>
        {taskData.image && !removeImage && (
          <div className="my-2 flex cursor-pointer items-center gap-x-2 px-2" onClick={handleRemoveImage}>
            <span>Remove Image</span>
            <Trash className={styles.icon} />
          </div>
        )}
        <div>
          {taskData.tags.map((tag: any, index: number) => (
            <div key={index} className={styles.tag} style={{ backgroundColor: tag.color.bg, color: tag.color.text }} onClick={() => handleTagDelete(index)}>
              {tag.title}
            </div>
          ))}
        </div>
        <button disabled={uploadingImg} className={styles.btn} onClick={submitForm}>
          Submit Task
        </button>
        {error && (
          <div className={styles.error}>
            <ShieldAlert />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
