// import "./Dropdown.css";
// [x-cloak] {
//   display: none !important;
// }
import React, { useState } from 'react';
import styles from './select.module.css';
import { priorityOptions } from '../../../utils/constants';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Option {
  value: string;
  label?: string;
}

type Props = {
  onSelect: (option: string) => void; // Callback function to handle option selection
  label: string; // Label for the dropdown
  selected: string | undefined; // Currently selected option
};

const Dropdown: React.FC<Props> = ({ onSelect, label, selected }) => {
  const [isOpen, setIsOpen] = useState(false); // State to track whether the dropdown is open or closed
  const handleClick = () => setIsOpen(!isOpen); // Toggle the dropdown on button click

  const handleOptionClick = (option: string) => {
    onSelect(option); // Call the onSelect callback with the selected option
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className={styles.container}>
      <div className="relative">
        {/* Dropdown button */}
        <button className={styles.button} onClick={handleClick}>
          <span className={`${styles.buttonText} ${selected ? styles.buttonTextSelected : styles.buttonTextUnselected}`}>
            {/* Display selected option or label */}
            {selected || label}
          </span>
          {/* Dropdown arrow icon */}
          {isOpen ? <ChevronUp className={styles.icon} /> : <ChevronDown className={styles.icon} />}
        </button>

        {/* Dropdown options */}
        {isOpen && (
          <ul className={styles.dropdownMenu}>
            {/* Mapping through priority options */}
            {priorityOptions.map((option: Option, index: number) => (
              <li
                key={option.value}
                className={`${styles.option} ${index === 0 ? styles.optionFirst : ''} ${index === priorityOptions.length - 1 ? styles.optionLast : ''}`}
                onClick={() => handleOptionClick(option.value)}
              >
                {/* Display option label or value */}
                {option.label || option.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
