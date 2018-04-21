import { Injectable } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { filter, tap } from 'rxjs/operators';
import { FrDialogService, FrToasterService } from 'francette';

import { AppState, Todo } from './state';

import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { StoreService } from './store.service';

@Injectable()
export class ActionCreatorService {

  constructor(
    private dialog: FrDialogService,
    private toaster: FrToasterService,
    private store: StoreService
  ) {}

  addTodo(todo: Todo): void {
    this.store.emit(state => {
      return Object.assign({}, state, {
        input: new Todo(),
        list: [...state.list, todo]
      });
    });
  }

  updateTaskStatus(id: string): void {
    const fn = (state: AppState): AppState => {
      return Object.assign({}, state, {
        list: state.list.map(item => {
          if (item.id === id) { item.finished = !item.finished; }
          return item;
        })
      })
    };
    this.store.emit(fn);
  }

  checkAll(): void {
    const fn = (state: AppState): AppState => {
      return Object.assign({}, state, {
        list: state.list.map(item => {
          item.finished = true;
          return item;
        })
      });
    };
    this.store.emit(fn);
  }

  uncheckAll(): void {
    const fn = (state: AppState): AppState => {
      return Object.assign({}, state, {
        list: state.list.map(item => {
          item.finished = false;
          return item;
        })
      });
    };
    this.store.emit(fn);
  }

  removeFinished(): void {
    const fn = (state: AppState): AppState => {
      return Object.assign({}, state, {
        list: state.list.filter(item => item.finished === false)
      });
    };
    this.store.emit(fn);
  }

  returnToForm(todo: Todo): void {
    this.dialog.open<string>(EditDialogComponent, { text: todo.task }).pipe(
      filter(v => v !== '')
    ).subscribe(v => {
      const fn = (state: AppState): AppState => {
        const newList = state.list.map(item => {
          if (todo.id === item.id) { item.task = v; }
          return item;
        });
        return Object.assign({}, state, { list: newList });
      };
      this.store.emit(fn);
    });
  }

  removeTask(todo: Todo): void {
    const fn = (state: AppState): AppState => {
      return Object.assign({}, state, {
        list: state.list.filter(item => item.id !== todo.id)
      });
    };
    this.store.emit(fn);
  }

}
