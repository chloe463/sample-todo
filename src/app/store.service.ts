import { Injectable } from '@angular/core';

import { Armory } from 'romuald';

import { AppState, initialState } from './state';
import { reducer } from './reducer';

@Injectable()
export class StoreService extends Armory<AppState> {

  constructor() {
    super(initialState, reducer);
  }

}
