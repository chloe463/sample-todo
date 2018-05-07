import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, pluck, tap } from 'rxjs/operators';

import { ActionCreatorService } from '../action-creator.service';
import { Todo, AppState } from '../state';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todos: Todo[];
  public inProgress: boolean;
  public todos$: Observable<Todo[]>;
  public inProgress$: Observable<boolean>;

  public state$;

  constructor(
    private actionCreator: ActionCreatorService,
    private store: StoreService
  ) {
    this.state$      = store.pipe();
    this.todos$      = this.state$.pipe(pluck('list', 'todos'));
    this.inProgress$ = this.state$.pipe(pluck('list', 'inProgress'));
  }

  ngOnInit() {
    this.store.emitAsync(this.actionCreator.fetchTodos());
  }

  updateTaskStatus(event, todo: Todo): void {
    this.store.emitAsync(this.actionCreator.updateTaskStatus(todo, event['value']));
  }

  checkAll(): void {
    this.store.emitAsync(this.actionCreator.checkAll());
  }

  uncheckAll(): void {
    this.store.emitAsync(this.actionCreator.uncheckAll());
  }

  removeFinished(): void {
    this.store.emitAsync(this.actionCreator.removeFinished());
  }

  returnToForm(todo: Todo): void {
    this.store.emitAsync(this.actionCreator.returnToForm(todo));
  }

  removeTask(todo: Todo): void {
    this.store.emitAsync(this.actionCreator.removeTask(todo));
  }

}
