import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent implements OnInit {
  public dataSource: any;
  public raspunsMessage: any;
  public coloaneAfisate: string[] = ['nume', 'email', 'numarTelefon', 'status'];

  public constructor(
    private userService: UserService,
    private snackBarService: SnackbarService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.populeazaTabela();
  }

  public populeazaTabela(): void {
    this.userService.getAllUilizatori().subscribe(
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
    console.log((event.target as HTMLInputElement).value);
    const valoareFiltrata = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valoareFiltrata.trim().toLocaleLowerCase();
  }

  public onChange(status: any, id: any): void {
    var data = {
      status: status.toString(),
      id: id,
    };
    this.userService.updateUtilizator(data).subscribe(
      (raspuns: any) => {
        this.raspunsMessage =raspuns?.message;
        this.snackBarService.openSnackBar(
          this.raspunsMessage,
          'Succes'
        );
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
