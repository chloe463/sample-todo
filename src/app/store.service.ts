import { Injectable } from '@angular/core';

import { Armory, Action } from 'romuald';

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

export const reducer = (state: AppState, action: Action): AppState => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todo: { id: 0, task: '', finished: false },
        list: [
          ...state.list,
          { id: state.list.length+1, task: payload.todo.task, finished: false }
        ]
      });
    case 'UPDATE_STATUS':
      return Object.assign({}, state, {
        list: state.list.map(todo => {
          if (todo.id === payload.id) {
            return Object.assign({}, todo, { finished: !todo.finished });
          }
          return todo;
        })
      });
    case 'CHECK_ALL':
      return Object.assign({}, state, {
        list: state.list.map(todo => {
          return Object.assign({}, todo, { finished: true });
        })
      });
    case 'UNCHECK_ALL':
      return Object.assign({}, state, {
        list: state.list.map(todo => {
          return Object.assign({}, todo, { finished: false });
        })
      });
    case 'REMOVE_FINISHED':
      return Object.assign({}, state, {
        list: state.list.filter(todo => {
          return !todo.finished;
        })
      });
    case 'RETURN_TO_FORM':
      return Object.assign({}, state, {
        todo: payload.todo
      });
    case 'EDIT_TODO':
      return Object.assign({}, state, {
        todo: { id: 0, task: '', finished: false },
        list: state.list.map(todo => {
          if (todo.id === payload.todo.id) {
            return { id: todo.id, task: payload.todo.task, finished: false };
          }
          return todo;
        })
      });
    case 'REMOVE_TASK':
      return Object.assign({}, state, {
        list: state.list.filter(todo => {
          return todo.id != payload.todo.id
        })
      });
  }
  return state;
};

@Injectable()
export class StoreService extends Armory<AppState> {

  constructor() {
    super(initialState, reducer);
  }

}
