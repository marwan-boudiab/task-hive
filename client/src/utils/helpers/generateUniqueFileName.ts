import { v4 as uuidv4 } from 'uuid';

// Define a function to generate a unique filename for a given file
export const generateUniqueFileName = (file: File): string => `${uuidv4()}_${file.name}`;
