import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultManagementComponent } from './fault-management.component';

describe('FaultManagementComponent', () => {
  let component: FaultManagementComponent;
  let fixture: ComponentFixture<FaultManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaultManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
