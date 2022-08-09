import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillableFormComponent } from './fillable-form.component';

describe('FillableFormComponent', () => {
  let component: FillableFormComponent;
  let fixture: ComponentFixture<FillableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillableFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
