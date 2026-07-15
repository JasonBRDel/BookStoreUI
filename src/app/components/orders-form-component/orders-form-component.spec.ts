import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersFormComponent } from './orders-form-component';

describe('OrdersFormComponent', () => {
  let component: OrdersFormComponent;
  let fixture: ComponentFixture<OrdersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
