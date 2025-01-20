import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumericOnlyDirective } from './numeric-only.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: ` <input type="text" appNumericOnly /> `,
  standalone: true,
  imports: [NumericOnlyDirective],
})
class TestComponent {}

describe('NumericOnlyDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputElement = fixture.debugElement.query(By.css('input'));
  });

  it('should allow only numeric characters', () => {
    // Ingresar caracteres numéricos
    inputElement.nativeElement.value = '123';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    expect(inputElement.nativeElement.value).toBe('123');

    // Ingresar caracteres no numéricos
    inputElement.nativeElement.value = 'abc123';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    expect(inputElement.nativeElement.value).toBe('123');

    // Ingresar caracteres especiales
    inputElement.nativeElement.value = '!@#$%^&*()';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    expect(inputElement.nativeElement.value).toBe('');

    // Ingresar espacios en blanco
    inputElement.nativeElement.value = ' 123 ';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    expect(inputElement.nativeElement.value).toBe('123');
  });
});
