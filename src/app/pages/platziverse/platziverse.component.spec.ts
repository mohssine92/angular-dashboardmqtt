import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatziverseComponent } from './platziverse.component';

describe('PlatziverseComponent', () => {
  let component: PlatziverseComponent;
  let fixture: ComponentFixture<PlatziverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatziverseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatziverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
