import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deleteproduct } from './deleteproduct';

describe('Deleteproduct', () => {
  let component: Deleteproduct;
  let fixture: ComponentFixture<Deleteproduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deleteproduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deleteproduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
