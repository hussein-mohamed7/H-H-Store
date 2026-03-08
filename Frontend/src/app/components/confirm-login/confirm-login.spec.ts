import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLogin } from './confirm-login';

describe('ConfirmLogin', () => {
  let component: ConfirmLogin;
  let fixture: ComponentFixture<ConfirmLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
