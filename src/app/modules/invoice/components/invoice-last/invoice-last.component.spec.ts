import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceLastComponent } from './invoice-last.component';

describe('InvoiceLastComponent', () => {
  let component: InvoiceLastComponent;
  let fixture: ComponentFixture<InvoiceLastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceLastComponent]
    });
    fixture = TestBed.createComponent(InvoiceLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
