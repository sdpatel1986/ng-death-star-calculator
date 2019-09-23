import { NgModule } from '@angular/core';

import { DeathStartCalculatorRoutingModule } from './death-start-calculator-routing.module';
import { CalculationOverviewComponent } from './pages/calculation-overview/calculation-overview.component';
import { NewCalculationComponent } from './pages/new-calculation/new-calculation.component';
import { SharedModule } from '../shared/shared.module';
import { CalculationsListComponent } from './components/calculations-list/calculations-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [CalculationOverviewComponent, NewCalculationComponent, CalculationsListComponent],
  imports: [
    DeathStartCalculatorRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ]
})
export class DeathStartCalculatorModule { }
