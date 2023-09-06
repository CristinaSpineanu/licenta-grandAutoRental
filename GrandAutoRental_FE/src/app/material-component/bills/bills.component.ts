import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Constants } from 'src/app/shared/constants';
import { ViewBillCarComponent } from '../dialog/view-bill-cars/view-bill-car.component';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';
import { saveAs } from 'file-saver';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent implements OnInit {
  public coloaneAfisate: string[] = [
    'nume',
    'email',
    'numarTelefon',
    'metodaPlata',
    'total',
    'editeaza',
  ];
  public dataSource: any = [];
  public raspunsMessage: any;
  public userRole: any;
  public userEmail:any;
  public deleteIconHovered: boolean[] = [];
  public pdfIconHovered: boolean[] = [];
  public previewIconHovered: boolean[] = [];

  public constructor(
    private billService: BillService,
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService
  ) {}

  public ngOnInit(): void {
    this.userRole = this.auth.getLoggedInUserRole();
    this.userEmail=this.auth.getLoggedInUserEmail();
    this.populeazaTabela();
  }



  public populeazaTabela(): void {
    if (this.userRole === 'admin') {
      this.billService.getToateFacturile().subscribe(
        (raspuns: any) => {
          this.dataSource = new MatTableDataSource(raspuns);
          this.deleteIconHovered = new Array(raspuns.length).fill(false);
          this.pdfIconHovered = new Array(raspuns.length).fill(false);
          this.previewIconHovered = new Array(raspuns.length).fill(false);
        },
        (eroare: any) => {
          if (eroare.error?.message) {
            this.raspunsMessage = eroare.error?.message;
          } else {
            this.raspunsMessage = Constants.eroareGenerica;
          }

          this.snackBarService.openSnackBar(
            this.raspunsMessage,
            Constants.eroare
          );
        }
      );
    }else{
      console.log( this.billService.getFacturiDupaEmail(this.userEmail));
      this.billService.getFacturiDupaEmail(this.userEmail).subscribe(
        (raspuns: any) => {
          this.dataSource = new MatTableDataSource(raspuns);
          this.deleteIconHovered = new Array(raspuns.length).fill(false);
          this.pdfIconHovered = new Array(raspuns.length).fill(false);
          this.previewIconHovered = new Array(raspuns.length).fill(false);
        },
        (eroare: any) => {
          if (eroare.error?.message) {
            this.raspunsMessage = eroare.error?.message;
          } else {
            this.raspunsMessage = Constants.eroareGenerica;
          }

          this.snackBarService.openSnackBar(
            this.raspunsMessage,
            Constants.eroare
          );
        }
      );
    }

  }


  public filtreazaData(event: Event) {
    const valoareFiltrata = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valoareFiltrata.trim().toLocaleLowerCase();
  }

  public gestioneazaVizualizare(value: any): void {
    let dialogConf = new MatDialogConfig();
    dialogConf.data = {
      data: value,
    };

    dialogConf.width = '100%';
    let dialogRef = this.dialog.open(ViewBillCarComponent, dialogConf);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }

  public gestioneazaDescarcarea(values: any): void {
    let data = {
      name: values.name,
      email: values.email,
      uuid: values.uuid,
      contactNumber: values.contactNumber,
      paymentMethod: values.paymentMethod,
      totalAmount: values.total,
      carDetails: values.carDetails,
    };
    this.billService.getPdf(data).subscribe((raspuns: any) => {
      saveAs(raspuns, values.uuid + '.pdf');
    });
  }

  public gestioneazaStergerea(values: any): void {
    let dialogConf = new MatDialogConfig();
    dialogConf.data = {
      message: ' stergi această factură',
    };

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConf);
    const sub = dialogRef.componentInstance.onEmitStatusChanges.subscribe(
      (raspuns: any) => {
        this.stergeFactura(values.id);
        dialogRef.close();
      }
    );
  }

  public stergeFactura(id: any) {
    this.billService.stergeFactura(id).subscribe(
      (raspuns: any) => {
        this.populeazaTabela();
        this.raspunsMessage = raspuns?.error.message;
        this.snackBarService.openSnackBar(this.raspunsMessage, 'Succes');
      },
      (eroare: any) => {
        if (eroare.error?.message) {
          this.raspunsMessage = eroare.error?.message;
        } else {
          this.raspunsMessage = Constants.eroareGenerica;
        }

        this.snackBarService.openSnackBar(
          this.raspunsMessage,
          Constants.eroare
        );
      }
    );
  }
}
