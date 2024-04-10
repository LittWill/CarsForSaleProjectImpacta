import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isLoading$ = new BehaviorSubject(false);

  constructor() { }

  exibir() {
    this.isLoading$.next(true)
  }

  ocultar(){
    this.isLoading$.next(false)
  }

}
