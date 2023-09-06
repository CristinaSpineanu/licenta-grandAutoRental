import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageCarComponent } from './manage-car/manage-car.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { BillsComponent } from './bills/bills.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

export const MaterialRoutes: Routes = [
  {
    path: 'category',
    component: ManageCategoryComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'car',
    component: ManageCarComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'order',
    component: ManageOrderComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin','user'],
    },
  },
  {
    path: 'bills',
    component: BillsComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin','user'],
    },
  },
  {
    path: 'user',
    component: ManageUserComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
  },
];
