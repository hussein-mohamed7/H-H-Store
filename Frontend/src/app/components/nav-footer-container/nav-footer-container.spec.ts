import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFooterContainer } from './nav-footer-container';

describe('NavFooterContainer', () => {
  let component: NavFooterContainer;
  let fixture: ComponentFixture<NavFooterContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavFooterContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavFooterContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
