import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationOverviewComponent } from './calculation-overview.component';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('CalculationOverviewComponent', () => {
  let component: CalculationOverviewComponent;
  let fixture: ComponentFixture<CalculationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculationOverviewComponent ],
      imports:[MatIconModule],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
