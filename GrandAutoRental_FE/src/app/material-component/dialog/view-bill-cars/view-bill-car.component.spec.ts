import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillCarComponent } from './view-bill-car.component';

describe('ViewBillCarComponent', () => {
  let component: ViewBillCarComponent;
  let fixture: ComponentFixture<ViewBillCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBillCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
