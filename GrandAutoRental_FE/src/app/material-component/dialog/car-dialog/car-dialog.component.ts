import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarService } from 'src/app/services/car.service';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.scss'],
})
export class CarDialogComponent implements OnInit {
  public laAdaugareMasina = new EventEmitter();
  public laEditareMasina = new EventEmitter();
  public laModificareaStatusului = new EventEmitter();
  public carForm: any = FormGroup;
  public dialogActiune: any = 'Adaugă';
  public actiune: any = 'Adaugă';
  public raspunsMessage: any;
  public categorii: any = [];

  public constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private carService: CarService,
    public dialogRef: MatDialogRef<CarDialogComponent>,
    private snackBarService: SnackbarService,
    private categoriiService: CategoryService
  ) {}

  public ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required],
      ],
      categoryId: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    if (this.dialogData.action === 'Editează') {
      this.dialogActiune = 'Editează';
      this.actiune = 'Modifică';
      this.carForm.patchValue(this.dialogData.data);
    }

    if (this.dialogData.action === 'Șterge') {
      this.dialogActiune = 'Șterge';
      this.actiune = 'Șterge';
      this.carForm.patchValue(this.dialogData.data);
    }

    this.getCategoriiDinCategService();
  }

  public getCategoriiDinCategService(): void {
    this.categoriiService.getCategorii().subscribe(
      (raspuns: any) => {
        this.categorii = raspuns;
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

  public onSubmit(): void {
    if (this.dialogActiune === 'Adaugă') {
      this.adauga();
    } else {
      this.editeaza();
    }
  }

  public adauga(): void {
    let formData = this.carForm.value;
    let data = {
      name: formData.name,
      categoryId: formData.categoryId,
      price: formData.price,
      description: formData.description,
    };

    this.carService.adauga(data).subscribe(
      (raspuns: any) => {
        this.dialogRef.close();
        this.laAdaugareMasina.emit();
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

  public editeaza(): void {
    let formData = this.carForm.value;
    let data = {
      id: this.dialogData.data.id,
      name: formData.name,
      categoryId: formData.categoryId,
      price: formData.price,
      description: formData.description,
    };

    this.carService.editeazaMasina(data).subscribe(
      (raspuns: any) => {
        this.dialogRef.close();
        this.laEditareMasina.emit();
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


  public inchideDialogul(): void {
    this.dialogRef.close();
  }
}
