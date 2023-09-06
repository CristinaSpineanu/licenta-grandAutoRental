import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-bill-car',
  templateUrl: './view-bill-car.component.html',
  styleUrls: ['./view-bill-car.component.scss'],
})
export class ViewBillCarComponent implements OnInit {
  public coloaneAfisate: string[] = [
    'categorie',
    'nume',
    'pret',
    'cantitate',
    'perioada',
    'total',
  ];
  public dataSource: any;
  public data: any;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialogRef: MatDialogRef<ViewBillCarComponent>
  ) {}

  public ngOnInit() {
    this.data=this.dialogData.data;
    this.dataSource=JSON.parse(this.dialogData.data.carDetails)
  }

  public inchideDialogul():void{
    this.dialogRef.close();
  }

}
