import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { calculation } from '../models/calculation';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  private calculationsSubject = new BehaviorSubject<calculation[]>([]);
  constructor() { }

  get currentSessionCalculations(): Observable<calculation[]> {
    return this.calculationsSubject.asObservable();
  }

  addCalculation(newCalculation: calculation) {
    const prevCalculations = this.calculationsSubject.value;
    this.calculationsSubject.next([...prevCalculations, newCalculation]);
  }

}
