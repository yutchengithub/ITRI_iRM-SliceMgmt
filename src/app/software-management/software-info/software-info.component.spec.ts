import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareInfoComponent } from './software-info.component';

describe('SoftwareInfoComponent', () => {
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
