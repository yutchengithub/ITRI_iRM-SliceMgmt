import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfInfoComponent } from './nf-info.component';

describe('NfInfoComponent', () => {
  let component: NfInfoComponent;
  let fixture: ComponentFixture<NfInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
