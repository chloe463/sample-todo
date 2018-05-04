import { Component, OnInit } from '@angular/core';

import { ActionCreatorService } from '../action-creator.service';
import { Todo, AppState } from '../state';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public list: Todo[];

  constructor(
    private actionCreator: ActionCreatorService,
    private store: StoreService
  ) {
    this.store.subscribe(state => {
      this.list = JSON.parse(JSON.stringify(state)).list;
    });
  }

  ngOnInit() {
    this.store.emitAsync(this.actionCreator.fetchTodos());
  }

  updateTaskStatus(todo: Todo): void {
    this.store.emitAsync(this.actionCreator.updateTaskStatus(todo));
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
