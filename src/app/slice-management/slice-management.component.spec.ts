import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliceManagementComponent } from './slice-management.component';

describe('SliceManagementComponent', () => {
  let component: SliceManagementComponent;
  let fixture: ComponentFixture< SliceManagementComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliceManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
