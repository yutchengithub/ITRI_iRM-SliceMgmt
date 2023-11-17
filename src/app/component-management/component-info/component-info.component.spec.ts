import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentInfoComponent } from './component-info.component';

describe('componentInfoComponent', () => {
  let component: ComponentInfoComponent;
  let fixture: ComponentFixture<ComponentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
