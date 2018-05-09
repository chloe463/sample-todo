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

  toggleProgress(inProgress: boolean) {
    this.store.emit(state => {
      return Object.assign({}, state, {
        list: {
          todos: state.list.todos,
          inProgress
        }
      });
    })
  }

  fetchTodos(): Observable<Function> {
    this.toggleProgress(true);
    return this.api.fetchTodos().pipe(
      tap(_ => this.toggleProgress(false)),
      map(todos => {
        return (state: AppState) => {
          return Object.assign({}, state, {
            input: new Todo(),
            list: {
              todos,
              inProgress: false
            }
          });
        };
      })
    );
  }

  addTodo(todo: Todo): Observable<object> {
    this.toggleProgress(true);
    return this.api.postTodo(todo).pipe(
      switchMap(_ => this.fetchTodos())
    );
  }

  updateTaskStatus(todo: Todo, value: boolean): Observable<object> {
    this.toggleProgress(true);
    return this.api.putTodo(todo, value).pipe(
      switchMap(_ => this.fetchTodos())
    );
  }

  checkAll(): Observable<object> {
    this.toggleProgress(true);
    return this.api.updateAllTodoStatus(true).pipe(
      switchMap(_ => this.fetchTodos())
    );
  }

  uncheckAll(): Observable<object> {
    this.toggleProgress(true);
    return this.api.updateAllTodoStatus(false).pipe(
      switchMap(_ => this.fetchTodos())
    );
  }

  removeFinished(): Observable<object> {
    this.toggleProgress(true);
    return this.api.removeAll().pipe(
      switchMap(_ => this.fetchTodos())
    );
  }

  returnToForm(todo: Todo): Observable<object> {
    return this.dialog.open<string>(EditDialogComponent, { text: todo.task }).pipe(
      filter(v => v!== ''),
      tap(_ => this.toggleProgress(true)),
      switchMap(v => this.api.updateTodo(todo, v)),
      switchMap(_ => this.fetchTodos())
    );
  }

  removeTask(todo: Todo): Observable<object> {
    this.toggleProgress(true);
    return this.api.remove(todo).pipe(
      switchMap(_ => this.fetchTodos())
    )
  }

}
