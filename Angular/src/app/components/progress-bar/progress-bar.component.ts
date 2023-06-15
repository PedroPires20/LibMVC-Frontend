import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
    <div
      [ngStyle]="{ '--filled-width': value + '%'}"
      [ngClass]="indefinite ? 'indefinite' : ''"
    >
   
    </div>
  `,
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  @Input()
  set value(value: number | undefined) {
    this._value = value && Math.floor(value * 100);
  }
  get value(): number | undefined {
    return this._value;
  }
  private _value?: number;

  get indefinite(): boolean {
    return !this._value || this._value < 0 || this._value > 100;
  }
}
