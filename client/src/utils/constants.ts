import type { Board, Color, Tag } from '../types';

const defaultBoardState: Board = {
  backlog: { name: 'Backlog', items: [] },
  pending: { name: 'Pending', items: [] },
  todo: { name: 'To Do', items: [] },
  doing: { name: 'Doing', items: [] },
  done: { name: 'Done', items: [] },
};

const priorityOptions = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

const initialTaskData = {
  title: '',
  description: '',
  priority: '',
  deadline: '',
  image: '',
  assignee: '',
  tags: [] as Tag[],
  state: '',
};

const colors: { [key: string]: Color } = {
  red: { color: { bg: '#fee2e2', text: '#dc2626' } },
  rose: { color: { bg: '#ffe4e6', text: '#e11d48' } },
  blue: { color: { bg: '#dbeafe', text: '#2563eb' } },
  green: { color: { bg: '#d1fae5', text: '#059669' } },
  indigo: { color: { bg: '#e0e7ff', text: '#4f46e5' } },
  cyan: { color: { bg: '#cffafe', text: '#0891b2' } },
  lime: { color: { bg: '#ecfccb', text: '#65a30d' } },
  amber: { color: { bg: '#fef3c7', text: '#d97706' } },
};

const allowedKeys = ['backlog', 'pending', 'todo', 'doing', 'done'];

const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

export { defaultBoardState, priorityOptions, initialTaskData, colors, allowedKeys, validFileTypes };
