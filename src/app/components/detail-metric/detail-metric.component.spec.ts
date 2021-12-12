import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMetricComponent } from './detail-metric.component';

describe('DetailMetricComponent', () => {
  let component: DetailMetricComponent;
  let fixture: ComponentFixture<DetailMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMetricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
