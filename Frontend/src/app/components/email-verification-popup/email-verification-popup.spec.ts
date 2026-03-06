import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationPopup } from './email-verification-popup';

describe('EmailVerificationPopup', () => {
  let component: EmailVerificationPopup;
  let fixture: ComponentFixture<EmailVerificationPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailVerificationPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailVerificationPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
