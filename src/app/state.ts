export interface Todo {
  id: number;
  task: string;
  finished: boolean;
}

export interface AppState {
  todo: Todo;
  list: Todo[];
}

export const initialState: AppState = {
  todo: { id: 0, task: '', finished: false },
  list: [
    { id: 1, task: 'Task1', finished: false },
    { id: 2, task: 'Task2', finished: true },
    { id: 3, task: 'Task3', finished: false },
  ]
};
