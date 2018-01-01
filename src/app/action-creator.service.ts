import { Injectable } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
// import { do } from 'rxjs/add/operator/do';
import 'rxjs/add/operator/do';

import { ACTION_TYPES } from './actions';
import { StoreService } from './store.service';

@Injectable()
export class ActionCreatorService {

  constructor(private store: StoreService) {}

  addTodo(todo): void {
    if (todo.id) {
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

  updateTaskStatus(id: number): void {
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

  returnToForm(todo): void {
    this.store.dispatch({
      type: ACTION_TYPES.RETURN_TO_FORM,
      payload: { todo }
    });
  }

  removeTask(todo): void {
    this.store.dispatch({
      type: ACTION_TYPES.REMOVE_TASK,
      payload: { todo }
    });
  }

}
