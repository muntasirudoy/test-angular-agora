import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EChamberComponent } from './e-chamber.component';

describe('EChamberComponent', () => {
  let component: EChamberComponent;
  let fixture: ComponentFixture<EChamberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EChamberComponent]
    });
    fixture = TestBed.createComponent(EChamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
