import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { FrancetteModule } from 'francette';
import {
  FrButtonModule,
  FrDialogModule,
  FrFormsModule,
  FrToasterModule,
  FrRippleModule
} from 'francette';

import { AppComponent } from './app.component';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { TodoListComponent } from './todo-list/todo-list.component';

import { ActionCreatorService } from './action-creator.service';
import { StoreService } from './store.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoInputComponent,
    TodoListComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    // FrancetteModule
    FrButtonModule,
    FrDialogModule,
    FrFormsModule,
    FrToasterModule,
    FrRippleModule
  ],
  entryComponents: [
    EditDialogComponent
  ],
  providers: [
    ActionCreatorService,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
