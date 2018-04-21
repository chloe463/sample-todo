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
  }

  updateTaskStatus(todo: Todo): void {
    this.actionCreator.updateTaskStatus(todo.id);
  }

  checkAll(): void {
    this.actionCreator.checkAll();
  }

  uncheckAll(): void {
    this.actionCreator.uncheckAll();
  }

  removeFinished(): void {
    this.actionCreator.removeFinished();
  }

  returnToForm(todo: Todo): void {
    this.actionCreator.returnToForm(todo);
  }

  removeTask(todo: Todo): void {
    this.actionCreator.removeTask(todo);
  }

}
