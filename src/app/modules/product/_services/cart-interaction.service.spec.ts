import { TestBed } from '@angular/core/testing';

import { CartInteractionService } from './cart-interaction.service';

describe('CartInteractionService', () => {
  let service: CartInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
