import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInfoComponent } from './log-info.component';

describe('SoftwareInfoComponent', () => {
  let component: LogInfoComponent;
  let fixture: ComponentFixture<LogInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
