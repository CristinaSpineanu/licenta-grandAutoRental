import { Injectable } from '@angular/core';

export interface Menu {
  stare: string;
  nume: string;
  iconName: string;
  role: string;
}

//role arata pentru cine poate fi vazut butonul(ruta respectiva
//daca este empty string este accesibila atat pentru admin,cat si pt user

const MENUITEMS = [
  { stare: 'dashboard', nume: 'Panou de control', iconName: 'dashboard', role: 'admin' },
  { stare: 'category', nume: 'Categorii', iconName: 'group_work', role: 'admin' },
  { stare: 'car', nume: 'Masini', iconName: 'car_rental', role: 'admin' },
  { stare: 'order', nume: 'Comenzi', iconName: 'list_alt', role: '' },
  { stare: 'bills', nume: 'Facturi', iconName: 'request_quote', role: '' },
  { stare: 'user', nume: 'Utilizatori', iconName: 'group', role: 'admin' },
];

@Injectable()
export class MenuItems {
  public getMenuItem(): Menu[] {
    return MENUITEMS;
  }
}
