import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogManagementComponent } from './log-management.component';  // Fault -> Log @10/30 by yuchen

describe('LogManagementComponent', () => {
  let component: LogManagementComponent;
  let fixture: ComponentFixture<LogManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
