import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageComponent } from './product-image.component';

describe('ProductImageComponent', () => {
  let component: ProductImageComponent;
  let fixture: ComponentFixture<ProductImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductImageComponent]
    });
    fixture = TestBed.createComponent(ProductImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
