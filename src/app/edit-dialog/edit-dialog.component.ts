import { Component, OnInit } from '@angular/core';
import { FrDialogContext } from 'francette';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  public text: string;

  constructor(private context: FrDialogContext<string>) { }

  ngOnInit() {
    this.text = this.context.params.text;
  }

  ok() {
    this.context.next(this.text);
  }
  ng() {
    this.context.next('');
  }

}
