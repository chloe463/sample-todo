import { Action } from 'romuald';

import { Todo, AppState, initialState } from './state';
import * as  ACTION_TYPES from './actions';

export const reducer = (state: AppState, action: Action): AppState => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.ADD_TODO:
      payload.todo.editing = false;
      return Object.assign({}, state, {
        input: new Todo(),
        list: [
          ...state.list,
          payload.todo
        ]
      });
    case ACTION_TYPES.UPDATE_STATUS:
      return Object.assign({}, state, {
        list: state.list.map(todo => {
          if (todo.id === payload.id) {
            todo.finished = !todo.finished;
            return todo;
          }
          return todo;
        })
      });
    case ACTION_TYPES.CHECK_ALL:
      return Object.assign({}, state, {
        list: state.list.map(todo => {
          todo.finished = true;
          return todo;
        })
      });
    case ACTION_TYPES.UNCHECK_ALL:
      return Object.assign({}, state, {
        list: state.list.map(todo => {
          todo.finished = false;
          return todo;
        })
      });
    case ACTION_TYPES.REMOVE_FINISHED:
      return Object.assign({}, state, {
        list: state.list.filter(todo => {
          return !todo.finished;
        })
      });
    case ACTION_TYPES.RETURN_TO_FORM:
      payload.todo.editing = true;
      return Object.assign({}, state, {
        input: payload.todo
      });
    case ACTION_TYPES.EDIT_TODO:
      return Object.assign({}, state, {
        input: new Todo(),
        list: state.list.map(todo => {
          if (todo.id === payload.todo.id) {
            return payload.todo;
          }
          return todo;
        })
      });
    case ACTION_TYPES.REMOVE_TASK:
      return Object.assign({}, state, {
        list: state.list.filter(todo => {
          return todo.id !== payload.todo.id;
        })
      });
  }
  return state;
};
