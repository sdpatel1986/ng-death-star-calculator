import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculationOverviewComponent } from './pages/calculation-overview/calculation-overview.component';
import { NewCalculationComponent } from './pages/new-calculation/new-calculation.component';


const routes: Routes = [
  { path: 'overview', component: CalculationOverviewComponent },
  { path: 'new-calculation', component: NewCalculationComponent },
  { path: '', pathMatch: 'full', redirectTo: 'overview' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeathStartCalculatorRoutingModule { }
