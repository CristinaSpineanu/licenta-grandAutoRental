import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input/input-module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility and change icon name', () => {
    const button = fixture.debugElement.query(By.css('button'));
    const iconWithVisibilityOff = fixture.debugElement.query(By.css('.visibility-off'));
    expect(iconWithVisibilityOff.nativeElement.textContent.trim()).toBe('visibility_off');


    button.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();
    const iconWithVisibilityOn = fixture.debugElement.query(By.css('.visibility-on'));
    expect(iconWithVisibilityOn.nativeElement.textContent.trim()).toBe('visibility');

  });
});
