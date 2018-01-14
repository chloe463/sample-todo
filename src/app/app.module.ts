import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { FrFormsModule } from 'francette/forms';

import { AppComponent } from './app.component';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { TodoListComponent } from './todo-list/todo-list.component';

import { ActionCreatorService } from './action-creator.service';
import { StoreService } from './store.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoInputComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    FrFormsModule
  ],
  providers: [
    ActionCreatorService,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
