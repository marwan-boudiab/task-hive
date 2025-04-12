import { Color } from '../../types';
import { colors } from '../constants';

// Define a function to get a random color
export const getRandomColors = (): Color => {
  // Get the keys of the colors object
  const keys = Object.keys(colors);

  // Generate a random index to select a random key
  const randomKey = keys[Math.floor(Math.random() * keys.length)];

  // Return the color corresponding to the randomly selected key
  return colors[randomKey];
};
