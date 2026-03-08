import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalCardSlider } from './vertical-card-slider';

describe('VerticalCardSlider', () => {
  let component: VerticalCardSlider;
  let fixture: ComponentFixture<VerticalCardSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalCardSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalCardSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
