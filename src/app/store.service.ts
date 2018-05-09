import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { tap, switchMap } from 'rxjs/operators';

import { Armory } from '@chloe463/romuald';

import { AppState, initialState } from './state';

@Injectable()
export class StoreService extends Armory<AppState> {

  constructor() {
    super(initialState);
  }

  emitAsync(action: Observable<any>) {
    action = action.pipe(
      tap(fn => this.emit(fn))
    );
    action.subscribe();
    return action;
  }

}
