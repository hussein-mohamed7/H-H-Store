import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deletecard } from './deletecard';

describe('Deletecard', () => {
  let component: Deletecard;
  let fixture: ComponentFixture<Deletecard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deletecard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deletecard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
