import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormComponent } from './registration-form.component';
import { NumericOnlyDirective } from '../../directive/numeric-only.directive';
import { By } from '@angular/platform-browser';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationFormComponent, NumericOnlyDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all form fields accessible', () => {
    const firstNameInput = fixture.debugElement.query(By.css('#firstName'));
    const lastNameInput = fixture.debugElement.query(By.css('#lastName'));
    const emailInput = fixture.debugElement.query(By.css('#email'));
    const documentTypeSelect = fixture.debugElement.query(
      By.css('#documentType')
    );
    const documentNumberInput = fixture.debugElement.query(
      By.css('#documentNumber')
    );
    const genderSelect = fixture.debugElement.query(By.css('#gender'));
    const countrySelect = fixture.debugElement.query(By.css('#country'));
    const phoneInput = fixture.debugElement.query(By.css('#phone'));
    const passwordInput = fixture.debugElement.query(By.css('#password'));
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );

    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(documentTypeSelect).toBeTruthy();
    expect(documentNumberInput).toBeTruthy();
    expect(genderSelect).toBeTruthy();
    expect(countrySelect).toBeTruthy();
    expect(phoneInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });
});
