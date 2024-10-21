import { Directive, ElementRef, HostListener } from "@angular/core";
import { Platform } from '@ionic/angular';

@Directive({
  selector: '[separator]',
  standalone: true
})
export class SeparatorDirective {

  constructor(
    private element: ElementRef,
    private platform: Platform
  ) {}
  inputElement: any
  @HostListener('window:keyup', ['$event'])
  handleKeyboardEventkeyup(event: any) {

    if (this.element.nativeElement.value === '-') return;
    let commasRemoved = this.element.nativeElement.value.toString().replace(/\./g, '');
    let toInt: number;
    let toLocale: string;
    toInt = parseInt(commasRemoved);
    toLocale = toInt.toLocaleString('id-ID');

    if (toLocale === 'NaN') {
      this.element.nativeElement.value = '';
    } else {
      this.element.nativeElement.value = toLocale;
    }
  }
}
