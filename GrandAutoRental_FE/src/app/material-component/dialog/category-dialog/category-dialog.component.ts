import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  public laAdaugareCategorie = new EventEmitter();
  public laEditareCategorie = new EventEmitter();
  public categoryForm: any = FormGroup;
  public dialogActiune: any = 'Adaugă';
  public actiune: any = 'Adaugă';
  public raspunsMessage: any;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    private snackBarService: SnackbarService
  ) {}

  public ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

    if (this.dialogData.name === 'Editează') {
      this.dialogActiune = 'Editează';
      this.actiune = 'Modifică';
      this.categoryForm.patchValue(this.dialogData.data);
    }
  }

  public onSubmit(): void {
    if (this.dialogActiune === 'Adaugă') {
      this.adauga();
    } else {
      this.editeaza();
    }
  }

  public editeaza() {
    console.log('Dialog Data:', this.dialogData);

    let formData = this.categoryForm.value;
    let data = {
      id: this.dialogData.data.id,
      name: formData.name,
    };

    this.categoryService.updateCategorie(data).subscribe(
      (raspuns: any) => {
        this.dialogRef.close();
        this.laEditareCategorie.emit();
        this.raspunsMessage = raspuns.message;
        this.snackBarService.openSnackBar(this.raspunsMessage, 'Succes');
      },
      (eroare: any) => {
        this.dialogRef.close();
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

  public adauga() {
    let formData = this.categoryForm.value;
    let data = {
      name: formData.name,
    };

    this.categoryService.adaugaCategorie(data).subscribe(
      (raspuns: any) => {
        this.dialogRef.close();
        this.laAdaugareCategorie.emit();
        this.raspunsMessage = raspuns.message;
        this.snackBarService.openSnackBar(this.raspunsMessage, 'Succes');
      },
      (eroare: any) => {
        this.dialogRef.close();
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
