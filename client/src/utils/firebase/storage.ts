// firebaseUtils.ts
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import app from './config';

// Function to upload image to Firebase storage
export const uploadImageToFirebase = async (file: File, filePath: string): Promise<string> => {
  const imagePath = `/uploads/${filePath}`;
  const storage = getStorage(app); // Get Firebase storage instance
  const storageRef = ref(storage, imagePath); // Create a reference to the storage path
  await uploadBytes(storageRef, file); // Upload the file
  const downloadURL = await getDownloadURL(storageRef); // Get the download URL of the uploaded file
  // console.log(downloadURL);
  return downloadURL;
};

// Function to delete image from Firebase storage
export const deleteImageFromFirebase = async (imageURL: string): Promise<void> => {
  const storage = getStorage();
  const storageRef = ref(storage, imageURL);
  await deleteObject(storageRef);
};
