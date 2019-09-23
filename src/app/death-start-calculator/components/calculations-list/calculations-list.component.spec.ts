import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationsListComponent } from './calculations-list.component';

describe('CalculationsListComponent', () => {
  let component: CalculationsListComponent;
  let fixture: ComponentFixture<CalculationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculationsListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('joinStrings function', () => {

    it("should join strings with '/'", () => {
      const stringArr = ['a', 'b', 'c'];
      const result = component.joinStrings(stringArr);
      expect(result).toBe('a/b/c');
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
