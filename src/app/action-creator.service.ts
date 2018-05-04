import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { timer } from 'rxjs/observable/timer';
import { catchError, filter, map, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { FrDialogService, FrToasterService } from 'francette';

import { AppState, Todo, initialState } from './state';

import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { StoreService } from './store.service';
import { DummyApiService } from './dummy-api.service';

@Injectable()
export class ActionCreatorService {

  constructor(
    private dialog: FrDialogService,
    private toaster: FrToasterService,
    private store: StoreService,
    private api: DummyApiService
  ) {}

  fetchTodos(): Observable<Function> {
    return this.api.fetchTodos().pipe(
      map(todos => {
        return (state: AppState) => {
          return Object.assign({}, state, {
            input: new Todo(),
            list: todos
          });
        };
      })
    );
  }

  addTodo(todo: Todo): Observable<object> {
    return this.api.postTodo(todo).pipe(
      switchMap(_ => this.fetchTodos())
    );
  }

  updateTaskStatus(todo: Todo): Observable<object> {
    return this.api.putTodo(todo).pipe(
      switchMap(_ => this.fetchTodos())
    );
  }

  checkAll(): Observable<object> {
    return this.api.updateAllTodoStatus(true).pipe(
      switchMap(_ => this.fetchTodos())
    );
  }

  uncheckAll(): Observable<object> {
    return this.api.updateAllTodoStatus(false).pipe(
      switchMap(_ => this.fetchTodos())
    );
  }

  removeFinished(): Observable<object> {
    return this.api.removeAll().pipe(
      switchMap(_ => this.fetchTodos())
    );
  }

  returnToForm(todo: Todo): Observable<object> {
    return this.dialog.open<string>(EditDialogComponent, { text: todo.task }).pipe(
      filter(v => v!== ''),
      switchMap(v => this.api.updateTodo(todo, v)),
      switchMap(_ => this.fetchTodos())
    );
  }

  removeTask(todo: Todo): Observable<object> {
    return this.api.remove(todo).pipe(
      switchMap(_ => this.fetchTodos())
    )
  }

}
