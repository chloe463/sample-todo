import { Component, OnInit } from '@angular/core';

import { ActionCreatorService } from '../action-creator.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public state;

  constructor(
    private actionCreator: ActionCreatorService,
    private store: StoreService
  ) {
    this.store.subscribe(newState => {
      this.state = JSON.parse(JSON.stringify(newState));
    });
  }

  ngOnInit() {
  }

  updateTaskStatus(todo): void {
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

  returnToForm(todo): void {
    this.actionCreator.returnToForm(todo);
  }

  removeTask(todo): void {
    this.actionCreator.removeTask(todo);
  }

}
