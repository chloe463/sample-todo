import { Injectable } from '@angular/core';
import { timer } from 'rxjs/Observable/timer';
// import { do } from 'rxjs/add/operator/do';
import 'rxjs/add/operator/do';

import { StoreService } from './store.service';

@Injectable()
export class ActionCreatorService {

  constructor(private store: StoreService) {}

  addTodo(todo): void {
    if (todo.id) {
      this.store.dispatch({
        type: 'EDIT_TODO',
        payload: { todo }
      });
    } else {
      this.store.dispatch({
        type: 'ADD_TODO',
        payload: { todo }
      });
    }
  }

  updateTaskStatus(id: number): void {
    timer(500).subscribe(() => {
      this.store.dispatch({
        type: 'UPDATE_STATUS',
        payload: { id }
      });
    });
  }

  checkAll(): void {
    timer(100).subscribe(() => {
      this.store.dispatch({
        type: 'CHECK_ALL'
      });
    });
  }

  uncheckAll(): void {
    timer(100).subscribe(() => {
      this.store.dispatch({
        type: 'UNCHECK_ALL'
      });
    });
  }

  removeFinished(): void {
    timer(100).subscribe(() => {
      this.store.dispatch({
        type: 'REMOVE_FINISHED'
      });
    });
  }

  returnToForm(todo): void {
    this.store.dispatch({
      type: 'RETURN_TO_FORM',
      payload: { todo }
    });
  }

  removeTask(todo): void {
    this.store.dispatch({
      type: 'REMOVE_TASK',
      payload: { todo }
    });
  }

}
