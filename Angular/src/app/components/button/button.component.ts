import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button [class]="variant" [disabled]="disabled" [attr.aria-disabled]="disabled">
      <ng-content/>
    </button>
  `,
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() variant: "primary" | "secondary" = "primary";
  @Input() disabled = false;
}
