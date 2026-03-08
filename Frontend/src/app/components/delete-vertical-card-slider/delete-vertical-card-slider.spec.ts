import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deletecared } from './delete-vertical-card-slider';

describe('Deletecared', () => {
  let component: Deletecared;
  let fixture: ComponentFixture<Deletecared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deletecared]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deletecared);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
