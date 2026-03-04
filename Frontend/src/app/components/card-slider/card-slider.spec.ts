import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSlider } from './card-slider';

describe('CardSlider', () => {
  let component: CardSlider;
  let fixture: ComponentFixture<CardSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
