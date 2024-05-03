import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliceInfoComponent } from './slice-info.component';

describe('SliceInfoComponent', () => {
  let component: SliceInfoComponent;
  let fixture: ComponentFixture< SliceInfoComponent >;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliceInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent( SliceInfoComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
