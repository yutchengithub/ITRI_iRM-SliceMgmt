import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfPerformanceInfoComponent } from './nf-performance-info.component';

describe('NfPerformanceInfoComponent', () => {
  let component: NfPerformanceInfoComponent;
  let fixture: ComponentFixture<NfPerformanceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfPerformanceInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfPerformanceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
