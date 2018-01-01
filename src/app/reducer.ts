import { Action } from 'romuald';

import { Todo, AppState, initialState } from './state';

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
