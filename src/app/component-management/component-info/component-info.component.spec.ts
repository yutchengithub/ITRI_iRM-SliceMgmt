import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareInfoComponent } from './component--info.component';

describe('componentInfoComponent', () => {
  let component: SoftwareInfoComponent;
  let fixture: ComponentFixture<SoftwareInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
