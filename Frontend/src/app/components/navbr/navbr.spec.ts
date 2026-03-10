import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbr } from './navbar';

describe('Navbr', () => {
  let component: Navbr;
  let fixture: ComponentFixture<Navbr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbr);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
