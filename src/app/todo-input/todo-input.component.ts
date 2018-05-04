import { Component, OnInit } from '@angular/core';

import { ActionCreatorService } from '../action-creator.service';
import { AppState, Todo } from '../state';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  public todo: Todo;

  constructor(
    private actionCreator: ActionCreatorService,
    public store: StoreService
  ) {
    this.store.subscribe(state => {
      this.todo = state.input;
    });
  }

  ngOnInit() {
  }

  submit() {
    this.store.emitAsync(this.actionCreator.addTodo(this.todo));
  }

}
