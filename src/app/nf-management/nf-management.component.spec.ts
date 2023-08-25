import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfManagementComponent } from './nf-management.component';

describe('NfManagementComponent', () => {
  let component: NfManagementComponent;
  let fixture: ComponentFixture<NfManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
