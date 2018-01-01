import { Component, OnInit } from '@angular/core';

import { ActionCreatorService } from '../action-creator.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  public todo;

  constructor(
    private actionCreator: ActionCreatorService,
    private store: StoreService
  ) {
    this.store.subscribe(newState => {
      this.todo = newState.todo;
    });
  }

  ngOnInit() {
  }

  submit() {
    this.actionCreator.addTodo(this.todo);
  }

}
