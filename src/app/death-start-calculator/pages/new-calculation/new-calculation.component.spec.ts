import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCalculationComponent } from './new-calculation.component';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { Person } from '../../models/person';
import { Planet } from '../../models/planet';
import { PlanetsService } from '../../services/planets.service';
import { of } from 'rxjs';
import { calculation } from '../../models/calculation';
import { CalculationsService } from '../../services/calculations.service';
describe('NewCalculationComponent', () => {
  let component: NewCalculationComponent;
  let fixture: ComponentFixture<NewCalculationComponent>;
  let planetsService: PlanetsService;
  let calculationsService: CalculationsService;
  const fakePeople: Person[] = [
    {
      name: 'fake Person 1',
      gender: 'male',
      height: 177,
      homeworld: 1,
      mass: 111,
    },
    {
      name: 'fake Person 2',
      gender: 'female',
      height: 177,
      homeworld: 1,
      mass: 111,
    },
    {
      name: 'fake Person 3',
      gender: 'male',
      height: 177,
      homeworld: 2,
      mass: 111,
    },
    {
      name: 'fake Person 4',
      gender: 'male',
      height: 177,
      homeworld: 3,
      mass: 111,
    }
  ];
  const fakePlanets: Planet[] = [
    {
      diameter: 10,
      name: 'fake Planet 1',
      population: 1000,
    },
    {
      diameter: 20,
      name: 'fake Planet 2',
      population: 1000,
    },
    {
      diameter: 30,
      name: 'fake Planet 3',
      population: 1000,
    }
  ];
  const fakeCalculation: calculation = {
    people: fakePeople.map(p => p.name),
    totalVolume: 60
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewCalculationComponent],
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NgSelectModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCalculationComponent);
    planetsService = fixture.debugElement.injector.get(PlanetsService);
    calculationsService = fixture.debugElement.injector.get(CalculationsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.SelectedPeopleFC.patchValue(fakePeople);
    spyOn(planetsService, 'getByID').and.returnValues(...fakePlanets.map(fp => of(fp)));
    fixture.detectChanges();
  });

  describe('onInit', () => {
    beforeEach(() => {
      spyOn<NewCalculationComponent, any>(component, 'loadPeople');
      fixture.detectChanges();
      component.ngOnInit();

    })
    it('should init loadPeople listener', () => {
      expect(component['loadPeople']).toHaveBeenCalled();
    })
  })
  describe('calculate', () => {
    beforeEach(() => {
      component.calculate();
    })
    it('should fetch distinct planets data', () => {
      expect(planetsService.getByID).toHaveBeenCalledWith(1)
      expect(planetsService.getByID).toHaveBeenCalledWith(2)
      expect(planetsService.getByID).toHaveBeenCalledWith(3)
    });
    it('should calculate distinct planets volume', () => {
      expect(component.volumeCalculation).toEqual(fakeCalculation)
    })
  })
  describe('reset', () => {
    beforeEach(() => {
      component.volumeCalculation = { people: fakePeople.map(p => p.name), totalVolume: 60 };
      component.reset();
    })
    it('should reset selected people', () => {
      expect(component.SelectedPeople).toEqual([]);
    })
    it('should reset Calculated Volume', () => {
      expect(component.volumeCalculation).toBe(null);
    })
  })
  describe('addCalcuation', () => {
    beforeEach(() => {
      spyOn<CalculationsService, any>(calculationsService, 'addCalculation')
      spyOn<any, any>(component.router, 'navigate')
      component.calculate();
      component.addCalcuation();
      fixture.detectChanges();
    });
    it('should save current calculation', () => {
      expect(calculationsService.addCalculation).toHaveBeenCalledWith(fakeCalculation);
    });
    it('should navigate user to overview page', () => {
      expect(component.router.navigate).toHaveBeenCalledWith(['deathStarCalculator', 'overview']);
    })
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
