import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFocusNext]',
  standalone: true,
})
export class FocusNextDirective {
  @Input('appFocusNext') nextInput!: HTMLInputElement | HTMLSelectElement;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.nextInput) {
      this.nextInput.focus();
    }
  }
}
