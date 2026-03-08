import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updatesearch } from './updatesearch';

describe('Updatesearch', () => {
  let component: Updatesearch;
  let fixture: ComponentFixture<Updatesearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updatesearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updatesearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
