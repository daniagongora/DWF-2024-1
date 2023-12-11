import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerImageComponent } from './customer-image.component';

describe('CustomerImageComponent', () => {
  let component: CustomerImageComponent;
  let fixture: ComponentFixture<CustomerImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerImageComponent]
    });
    fixture = TestBed.createComponent(CustomerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
