import { Component, OnInit ,EventEmitter, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  public onEmitStatusChanges=new EventEmitter();
  public detalii:any={};
  public constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData:any
  ) { }

  public ngOnInit(): void {
    if(this.dialogData){{
     this.detalii=this.dialogData;
    }}

  }

  public gestioneazaSchimbareActiunii():void{
    //daca userul a selectat Da atunci putem emite mai departe
  this.onEmitStatusChanges.emit();
  }

}
