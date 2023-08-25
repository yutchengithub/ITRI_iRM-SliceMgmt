import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareManagementComponent } from './software-management.component';

describe('SoftwareManagementComponent', () => {
  let component: SoftwareManagementComponent;
  let fixture: ComponentFixture<SoftwareManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
