import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OCloudInfoComponent } from './field-info.component';

describe('OCloudInfoComponent', () => {
  let component: OCloudInfoComponent;
  let fixture: ComponentFixture<OCloudInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OCloudInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OCloudInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
