import { Injectable } from '@angular/core';
import { timer } from 'rxjs/observable/timer';

import * as  ACTION_TYPES from './actions';
import { Todo } from './state';
import { StoreService } from './store.service';

@Injectable()
export class ActionCreatorService {

  constructor(private store: StoreService) {}

  addTodo(todo: Todo): void {
    if (todo.editing) {
      this.store.dispatch({
        type: ACTION_TYPES.EDIT_TODO,
        payload: { todo }
      });
    } else {
      this.store.dispatch({
        type: ACTION_TYPES.ADD_TODO,
        payload: { todo }
      });
    }
  }

  updateTaskStatus(id: string): void {
    timer(500).subscribe(() => {
      this.store.dispatch({
        type: ACTION_TYPES.UPDATE_STATUS,
        payload: { id }
      });
    });
  }

  checkAll(): void {
    timer(100).subscribe(() => {
      this.store.dispatch({
        type: ACTION_TYPES.CHECK_ALL
      });
    });
  }

  uncheckAll(): void {
    timer(100).subscribe(() => {
      this.store.dispatch({
        type: ACTION_TYPES.UNCHECK_ALL
      });
    });
  }

  removeFinished(): void {
    timer(100).subscribe(() => {
      this.store.dispatch({
        type: ACTION_TYPES.REMOVE_FINISHED
      });
    });
  }

  returnToForm(todo: Todo): void {
    this.store.dispatch({
      type: ACTION_TYPES.RETURN_TO_FORM,
      payload: { todo }
    });
  }

  removeTask(todo: Todo): void {
    this.store.dispatch({
      type: ACTION_TYPES.REMOVE_TASK,
      payload: { todo }
    });
  }

}
