import { Component, OnInit } from '@angular/core';
import { CalculationsService } from '../../services/calculations.service';
import { calculation } from '../../models/calculation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calculation-overview',
  templateUrl: './calculation-overview.component.html',
  styleUrls: ['./calculation-overview.component.scss']
})
export class CalculationOverviewComponent implements OnInit {

  calculations$: Observable<calculation[]>;
  constructor(private calculationsService: CalculationsService) { }

  ngOnInit() {
    this.calculations$ = this.calculationsService.currentSessionCalculations;
  }

}
