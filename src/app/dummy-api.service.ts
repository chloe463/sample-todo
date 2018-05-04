import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { timer } from 'rxjs/observable/timer';
import { catchError, filter, map, switchMap, switchMapTo, tap } from 'rxjs/operators';

import { Todo, initialState } from './state';

@Injectable()
export class DummyApiService {

  private todos: Todo[] = [...initialState.list];

  constructor(){}

  fetchTodos(): Observable<Todo[]> {
    return timer(500).pipe(
      switchMap(_ => of(this.todos))
    );
  }

  postTodo(todo: Todo): Observable<Todo> {
    return timer(500).pipe(
      tap(v => this.todos = [...this.todos, todo]),
      switchMap(_ => of(todo))
    );
  }

  putTodo(todo: Todo): Observable<Todo> {
    return timer(500).pipe(
      tap(_ => {
        this.todos = this.todos.map(v => {
          if (v.id === todo.id) { v.finished = !v.finished; }
          return v;
        });
      }),
      switchMap(_ => of(todo))
    );
  }

  updateAllTodoStatus(status: boolean): Observable<Todo[]> {
    return timer(500).pipe(
      map(_ => {
        this.todos = this.todos.map(v => {
          v.finished = status;
          return v;
        });
        return this.todos;
      })
    );
  }

  updateTodo(todo: Todo, newText: string): Observable<Todo[]> {
    return timer(500).pipe(
      map(_ => {
        this.todos = this.todos.map(v => {
          if (v.id === todo.id) {
            v.task = newText;
          }
          return v;
        })
        return this.todos;
      })
    );
  }

  remove(todo: Todo): Observable<Todo[]> {
    return timer(500).pipe(
      map(_ => {
        this.todos = this.todos.filter(v => v.id !== todo.id);
        return this.todos;
      })
    );
  }

  removeAll(): Observable<Todo[]> {
    return timer(500).pipe(
      map(_ => {
        this.todos = this.todos.filter(v => v.finished === false);
        return this.todos;
      })
    );
  }
}
