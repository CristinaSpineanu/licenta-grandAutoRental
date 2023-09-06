import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillCarComponent } from './dialog/view-bill-cars/view-bill-car.component';
import { ChangePasswordDialogComponent } from './dialog/change-password-dialog/change-password-dialog.component';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { MatIconModule } from '@angular/material/icon';
import { CategoryDialogComponent } from './dialog/category-dialog/category-dialog.component';
import { ManageCarComponent } from './manage-car/manage-car.component';
import { CarDialogComponent } from './dialog/car-dialog/car-dialog.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { BillsComponent } from './bills/bills.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    MatIconModule
  ],
  providers: [],
  declarations: [
    ViewBillCarComponent,
    ChangePasswordDialogComponent,
    ConfirmationDialogComponent,
    ManageCategoryComponent,
    CategoryDialogComponent,
    ManageCarComponent,
    CarDialogComponent,
    ManageOrderComponent,
    BillsComponent,
    ManageUserComponent,

  ],
})
export class MaterialComponentsModule {}
