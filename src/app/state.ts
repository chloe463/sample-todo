export class Todo {
  public id: string;
  public task: string;
  public finished: boolean;
  public editing: boolean;

  constructor(seed?) {
    this.id       = seed && seed.id || Math.random().toString(36).slice(-8);
    this.task     = seed && seed.task || '';
    this.finished = seed && seed.finished || false;
    this.editing  = seed && seed.editing || false;
  }
}

export interface AppState {
  input: Todo;
  list: Todo[];
}

export const initialState: AppState = {
  input: new Todo(),
  list: [
    new Todo({ id: 1, task: 'Task1', finished: false }),
    new Todo({ id: 2, task: 'Task2', finished: true }),
    new Todo({ id: 3, task: 'Task3', finished: false })
  ]
};
