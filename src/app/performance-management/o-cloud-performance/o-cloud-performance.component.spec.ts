import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OCloudPerformanceComponent } from './o-cloud-performance.component';

describe('OCloudPerformanceComponent', () => {
  let component: OCloudPerformanceComponent;
  let fixture: ComponentFixture<OCloudPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OCloudPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OCloudPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
