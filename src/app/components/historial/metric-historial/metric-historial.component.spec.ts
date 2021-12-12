import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricHistorialComponent } from './metric-historial.component';

describe('MetricHistorialComponent', () => {
  let component: MetricHistorialComponent;
  let fixture: ComponentFixture<MetricHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricHistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
