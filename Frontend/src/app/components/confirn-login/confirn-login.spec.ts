import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirnLogin } from './confirn-login';

describe('ConfirnLogin', () => {
  let component: ConfirnLogin;
  let fixture: ComponentFixture<ConfirnLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirnLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirnLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
