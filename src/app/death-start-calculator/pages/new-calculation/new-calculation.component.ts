import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PeopleService } from '../../services/people.service';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { Person } from '../../models/person';
import { calculation } from '../../models/calculation';
import { PlanetsService } from '../../services/planets.service';
import { Planet } from '../../models/planet';
import { CalculationsService } from '../../services/calculations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-calculation',
  templateUrl: './new-calculation.component.html',
  styleUrls: ['./new-calculation.component.scss']
})
export class NewCalculationComponent implements OnInit {

  SelectedPeopleFC: FormControl;
  filteredPeople$: Observable<Person[]>;
  peopleInput$ = new Subject<string>();
  volumeCalculation: calculation;
  constructor(
    private fb: FormBuilder,
    private peopleService: PeopleService,
    private calculationsService: CalculationsService,
    public router: Router,
    private planetsService: PlanetsService) {
    this.SelectedPeopleFC = this.fb.control([]);
  }

  get SelectedPeople(): Person[] {
    return this.SelectedPeopleFC.value
  }
  ngOnInit() {
    this.loadPeople();
  }

  calculate() {
    const people = this.SelectedPeople.map(person => person.name);
    const planetsIds = this.SelectedPeople.map(p => p.homeworld);
    const uniquePlanets = planetsIds.filter((p, i) => planetsIds.indexOf(p) === i);
    forkJoin(uniquePlanets.map(pId => this.planetsService.getByID(pId)))
      .subscribe((planets: Planet[]) => {
        const totalVolume = planets.reduce((a, b) => a + b.diameter, 0);
        this.volumeCalculation = { people, totalVolume }
      })
  }

  reset() {
    this.SelectedPeopleFC.patchValue([]);
    this.volumeCalculation = null;
  }
  addCalcuation() {
    this.calculationsService.addCalculation(this.volumeCalculation);
    this.router.navigate(['deathStarCalculator', 'overview'])
  }

  private loadPeople() {
    this.filteredPeople$ =
      this.peopleInput$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => {
          this.volumeCalculation = null;
          return (term && term.length >= 2 ? this.peopleService.search(term) : of([]))
        })
      );
  }

}
