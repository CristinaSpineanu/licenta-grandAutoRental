import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Constants } from 'src/app/shared/constants';
import { CategoryDialogComponent } from '../dialog/category-dialog/category-dialog.component';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  public coloaneAfisate: string[] = ['nume', 'actiune'];
  public dataSource: any;
  public raspunsMessage: any;

  public constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBarService: SnackbarService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.populeazaTabela();
  }

  public populeazaTabela(): void {
    this.categoryService.getCategorii().subscribe(
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
    const valoareFiltrata = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valoareFiltrata.trim().toLocaleLowerCase();
  }

  public gestioneazaAdaugarea():void{
    const dialogConfig=new MatDialogConfig();

    dialogConfig.data={
      name:"Adaugă"
    }
    dialogConfig.width="850px";

    const dialogRef=this.dialog.open(CategoryDialogComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub=dialogRef.componentInstance.laAdaugareCategorie.subscribe(
      (raspuns)=>{
        this.populeazaTabela();
        //odata ce a fost emis eventul de adaugare categorie
        // trebuie sa facem refresh la tabela
      }
    )
  }


  public gestioneazaEditarea(values:any):void{
    const dialogConfig=new MatDialogConfig();

    dialogConfig.data={
      name: "Editează",
      data: values   //aici primim datele , in cazul nostru  numele categoriei
    }
    dialogConfig.width="850px";

    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.laEditareCategorie.subscribe(
      (raspuns) => {
        this.populeazaTabela();
      }
    );
  }


  public gestioneazaStergerea(values:any):void{
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
        this.stergereCategorie(values.id);
        dialogRef.close();
      }
    );
  }


  public stergereCategorie(id: any): void {
    this.categoryService.stergereCategorie(id).subscribe(
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
}
