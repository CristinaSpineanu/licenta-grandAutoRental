import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { CarService } from 'src/app/services/car.service';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Constants } from 'src/app/shared/constants';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss'],
})
export class ManageOrderComponent implements OnInit {
  public coloaneAfisate: string[] = [
    'categorie',
    'nume',
    'pret',
    'cantitate',
    'perioada',
    'total',
    'editeaza',
  ];
  public comeziForm: any = FormGroup;
  public dataSource: any = [];
  public raspunsMessage: any;
  public categorii: any = [];
  public masini: any = [];
  public pret: any = [];
  public totalAmount: number = 0;
  public minDate: Date = new Date(); //ziua curenta
  public zileSelectate: number = 1;

  public constructor(
    private categoryService: CategoryService,
    private carService: CarService,
    private billService: BillService,
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.comeziForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [
        null,
        [Validators.required, Validators.pattern(Constants.regexEmail)],
      ],
      contactNumber: [
        null,
        [Validators.required, Validators.pattern(Constants.regexNumarTelefon)],
      ],
      paymentMethod: [null, Validators.required],
      car: [null, Validators.required],
      category: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      price: [null, Validators.required],
      startDate: [null],
      endDate: [null],
      total: [0, Validators.required],
    });

    this.getCategorii();
  }

  public getCategorii(): void {
    //luam masinile dupa categorii, daca schimbam categoria,va trebui sa se faca update la masini
    this.categoryService.getCategorii().subscribe(
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

  public getMasiniByCategorie(value: any): void {
    this.carService.getMasiniByCategorieId(value.id).subscribe(
      (raspuns: any) => {
        this.masini = raspuns;
        this.comeziForm.controls['price'].setValue('');
        this.comeziForm.controls['quantity'].setValue('');
        this.comeziForm.controls['total'].setValue(0);
        this.comeziForm.controls['startDate'].setValue('');
        this.comeziForm.controls['endDate'].setValue('');

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

  public getDetaliiMasina(value: any): void {
    //Am ales categoria si atunci am ajuns la produs,
    //dupa ce alegem produsul se apeleaza metoda aceasta
    this.carService.getMasiniByMasinaId(value.id).subscribe(
      (raspuns: any) => {
        this.pret = raspuns.price;
        this.comeziForm.controls['price'].setValue(raspuns.price);
        this.comeziForm.controls['quantity'].setValue('1');
        this.comeziForm.controls['total'].setValue(this.pret * 1);
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

  public seteazaCantitatea(value: any): void {
    //Cu aceasta metoda updatam cantitatea
    let quant = this.comeziForm.controls['quantity'].value;
    if (quant > 0) {
      this.comeziForm.controls['total'].setValue(
        this.comeziForm.controls['quantity'].value *
          this.comeziForm.controls['price'].value
      );
    } else if (quant != '') {
      this.comeziForm.controls['quantity'].setValue('1');
      this.comeziForm.controls['total'].setValue(
        this.comeziForm.controls['quantity'].value *
          this.comeziForm.controls['price'].value
      );
    }
  }

  public valideazaAdaugarea(): boolean {
    if (
      this.comeziForm.controls['total'].value === 0 ||
      this.comeziForm.controls['total'].value === null ||
      this.comeziForm.controls['quantity'].value <= 0
    ) {
      return true;
    } else return false;
  }

  public valideazaSubmit(): boolean {
    if (
      this.totalAmount === 0 ||
      this.comeziForm.controls['name'].value === null ||
      this.comeziForm.controls['email'].value === null ||
      this.comeziForm.controls['contactNumber'].value === null ||
      this.comeziForm.controls['paymentMethod'].value === null ||
      !this.comeziForm.controls['contactNumber'].valid ||
      !this.comeziForm.controls['email'].valid
    ) {
      return true;
    }
    return false;
  }

  public adauga(): void {
    let formData = this.comeziForm.getRawValue();
    let numeMasina = this.dataSource.find(
      (element: { id: number }) => element.id === formData.car.id
    );
    if (numeMasina === undefined) {
      this.totalAmount = this.totalAmount + formData.total;

      // Calculate zileSelectate and set it as quantity
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const difetentaTimpMilisecunde = end.getTime() - start.getTime();
      const zileSelectate = Math.ceil(difetentaTimpMilisecunde / (1000 * 3600 * 24));

      const newData = {
        id: formData.car.id,
        name: formData.car.name,
        category: formData.category.name,
        quantity: zileSelectate,
        price: formData.price,
        total: formData.total,
        startDate: formData.startDate.toISOString().split("T")[0],
        endDate: formData.endDate.toISOString().split("T")[0],

      };

      this.dataSource.push(newData);
      this.dataSource = [...this.dataSource];
      console.log(this.dataSource );
      this.snackBarService.openSnackBar(Constants.masinaAdaugata, 'Succes');
    } else {
      this.snackBarService.openSnackBar(
        Constants.masinaExistaEroare,
        Constants.eroare
      );
    }
  }

  public gestioneazaStergerea(value: any, element: any): void {
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.splice(value, 1); // value indica indexul elementului care trebuie șters, iar 1 reprezintă numărul de elemente care trebuie șterse
    this.dataSource = [...this.dataSource];
  }

  public onSubmit(): void {
    const formData = this.comeziForm.value;
    const data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      startDate: formData.startDate.toISOString().split("T")[0],
      endDate: formData.endDate.toISOString().split("T")[0],
      totalAmount: this.totalAmount,
      carDetails: JSON.stringify(this.dataSource),
    };
    this.billService.genereazaRaport(data).subscribe(
      (raspuns: any) => {
        this.downloadFile(raspuns?.uuid);
        this.comeziForm.reset();
        this.dataSource = [];
        this.totalAmount = 0;
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

  public downloadFile(numeleFisierului: any): void {
    const data = { uuid: numeleFisierului };
    this.billService.getPdf(data).subscribe((raspuns: any) => {
      saveAs(raspuns, numeleFisierului + '.pdf');
    });
  }

  public calculeazaNrDeZile(): void {
    const startDate = this.comeziForm.controls.startDate.value;
    const endDate = this.comeziForm.controls.endDate.value;

    if (startDate && endDate) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      let difetentaTimpMilisecunde = end.getTime() - start.getTime(); //diferenta in milisecunde
      this.zileSelectate = Math.ceil(
        difetentaTimpMilisecunde / (1000 * 3600 * 24)
      ); //transformare in zile (24 hours*60 minutes*60 seconds*1000 milliseconds).

      this.comeziForm.controls['total'].setValue(
        this.zileSelectate  *
          this.comeziForm.controls['price'].value
      );
      this.comeziForm.controls['quantity'].setValue(
        this.zileSelectate
      );
    }
  }
}
