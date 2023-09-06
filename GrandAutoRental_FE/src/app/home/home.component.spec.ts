
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog } from '@angular/material/dialog';

describe('HomeComponent', () => {
  let component: HomeComponent; // reține instanța componentei
  let fixture: ComponentFixture<HomeComponent>; //stoca referința către fixture (componenta cu care se lucreaza în cadrul testelor).
  let dialog = TestBed.inject(MatDialog); //mat dialog service

  beforeEach(async () => {
    //aici setam configuratia modulelor si componentelor
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        HomeComponent,
        SignupComponent,
        ForgotPasswordComponent,
        LoginComponent,
      ],
      providers: [MatDialog],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent); //creeam o instanță a componentei
    component = fixture.componentInstance; //atribuim instanta componentei var component
    fixture.detectChanges(); //aici se produce detecția schimbărilor în fixture, pentru a vedea mereu ult modificari
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog SignupComponent on Intregistrare click', () => {
    const inregistareButton =
      fixture.nativeElement.querySelector('.btn-inregistare');

    spyOn(dialog, 'open'); // Spionam metoda open si verificam daca a fost apelata
    inregistareButton.click(); // Simulam click-ul

    expect(dialog.open).toHaveBeenCalledWith(SignupComponent, {
      //verificam daca metoda a fost apelata cu componenta corecta
      width: '550px',
    });
  });

  it('should open dialog ForgotPasswordComponent on Ai uitat parola click', () => {
    const parolaButton = fixture.nativeElement.querySelector('.btn-parola');

    spyOn(dialog, 'open');
    parolaButton.click();

    expect(dialog.open).toHaveBeenCalledWith(ForgotPasswordComponent, {
      width: '550px',
    });
  });

  it('should open dialog LoginComponent on Autentificare click', () => {
    const autentificareButton =
      fixture.nativeElement.querySelector('.btn-autentificare');

    spyOn(dialog, 'open');
    autentificareButton.click();

    expect(dialog.open).toHaveBeenCalledWith(LoginComponent, {
      width: '550px',
    });
  });
});
