import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartInteractionService {
  private refreshCartSubject = new BehaviorSubject<void>(undefined);

  refreshCart$ = this.refreshCartSubject.asObservable();

  triggerRefreshCart() {
    this.refreshCartSubject.next();
  }
}
