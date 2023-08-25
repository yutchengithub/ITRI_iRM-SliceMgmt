import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfPerformanceComponent } from './nf-performance.component';

describe('NfPerformanceComponent', () => {
  let component: NfPerformanceComponent;
  let fixture: ComponentFixture<NfPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
