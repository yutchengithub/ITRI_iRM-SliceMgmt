import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BSInfoComponent } from './bs-info.component';

describe('componentInfoComponent', () => {
  let component: BSInfoComponent;
  let fixture: ComponentFixture<BSInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BSInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BSInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
