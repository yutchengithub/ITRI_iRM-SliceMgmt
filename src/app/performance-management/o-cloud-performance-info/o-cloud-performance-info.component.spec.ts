import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OCloudPerformanceInfoComponent } from './o-cloud-performance-info.component';

describe('OCloudPerformanceInfoComponent', () => {
  let component: OCloudPerformanceInfoComponent;
  let fixture: ComponentFixture<OCloudPerformanceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OCloudPerformanceInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OCloudPerformanceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
