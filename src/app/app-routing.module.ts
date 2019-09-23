import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './core/pages/layout/layout.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [{
      path: 'deathStarCalculator', loadChildren: () =>
        import('./death-start-calculator/death-start-calculator.module')
          .then(m => m.DeathStartCalculatorModule)
    },
    { path: '', pathMatch: 'full', redirectTo: 'deathStarCalculator' }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
