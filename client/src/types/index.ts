type TaskT = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  deadline: number;
  image?: string;
  assignee?: string;
  tags: { title: string; color: { bg: string; text: string } }[];
};

type Column = { name: string; items: TaskT[] };
type Board = { [key: string]: Column };
type Tag = { title: string; color: { bg: string; text: string } };

type Action =
  | { type: 'SET_BOARD'; payload: Board | null }
  | { type: 'ADD_TASK'; column: string; item: TaskT }
  | { type: 'DELETE_TASK'; column: string; id: string }
  | { type: 'UPDATE_TASK'; column: string; item: TaskT }
  | { type: 'CLEAR_BOARD' };

type Color = { color: { bg: string; text: string } };

export type { TaskT, Action, Tag, Board, Color };
