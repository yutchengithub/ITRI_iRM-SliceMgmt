import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BSManagementComponent } from './bs-management.component';

describe('BSManagementComponent', () => {
  let component: BSManagementComponent;
  let fixture: ComponentFixture<BSManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BSManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BSManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
