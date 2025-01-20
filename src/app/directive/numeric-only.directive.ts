import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumericOnly]',
  standalone: true,
})
export class NumericOnlyDirective {
  constructor(private readonly _elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(_: Event): void {
    const input = this._elementRef.nativeElement as HTMLInputElement;
    // Reemplaza cualquier carácter que no sea numérico
    input.value = input.value.replace(/[^0-9]/g, '').trim();
  }
}
