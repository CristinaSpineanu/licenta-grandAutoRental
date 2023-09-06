import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Constants } from 'src/app/shared/constants';
import { CarDialogComponent } from '../dialog/car-dialog/car-dialog.component';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manage-car',
  templateUrl: './manage-car.component.html',
  styleUrls: ['./manage-car.component.scss'],
})
export class ManageCarComponent implements OnInit {
  public coloaneAfisate: string[] = [
    'nume',
    'numeleCategoriei',
    'descriere',
    'pret',
    'editeaza',
  ];
  public dataSource: any;
  public raspunsMessage: any;
  public constructor(
    private carService: CarService,
    private snackBarService: SnackbarService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.populeazaTabela();
  }

  public populeazaTabela(): void {
    this.carService.getMasini().subscribe(
      (raspuns: any) => {
        this.dataSource = new MatTableDataSource(raspuns);
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

  public filtreazaData(event: Event) {
    console.log(event)
    const valoareFiltrata = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valoareFiltrata.trim().toLocaleLowerCase();
  }

  public gestioneazaAdaugarea(): void {
    const dialogConf = new MatDialogConfig();
    dialogConf.data = {
      action: 'Adaugă',
    };
    dialogConf.width = '850px';
    const dialogRef = this.dialog.open(CarDialogComponent, dialogConf);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.laAdaugareMasina.subscribe(
      (raspuns) => {
        this.populeazaTabela();
        //odata ce a fost emis eventul de adaugare masina
        // trebuie sa facem refresh la tabela
      }
    );
  }

  public gestioneazaEditarea(values: any): void {
    const dialogConf = new MatDialogConfig();
    dialogConf.data = {
      action: 'Editează',
      data: values,
    };
    dialogConf.width = '850px';
    const dialogRef = this.dialog.open(CarDialogComponent, dialogConf);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.laEditareMasina.subscribe(
      (raspuns) => {
        this.populeazaTabela();
        //odata ce a fost emis eventul de editare masina
        // trebuie sa facem refresh la tabela
      }
    );
  }

  public gestioneazaStergerea(values: any): void {
    const dialogConf = new MatDialogConfig();
    dialogConf.data = {
      message: 'ștergi ' + values.name,
    };
    dialogConf.width = '850px';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConf);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEmitStatusChanges.subscribe(
      (raspuns) => {
        this.populeazaTabela();
        this.stergeMasina(values.id);
        dialogRef.close();
      }
    );
  }

  public stergeMasina(id: any): void {
    this.carService.stergereMasina(id).subscribe(
      (raspuns: any) => {
        this.populeazaTabela();
        this.raspunsMessage = raspuns.message;
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

  public onChange(status: any, id: any): void {
    let data = {
      status: status.toString(),
      id: id,
    };

    this.carService.editeazaStatus(data).subscribe(
      (raspuns: any) => {
        this.raspunsMessage = raspuns.message;
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
