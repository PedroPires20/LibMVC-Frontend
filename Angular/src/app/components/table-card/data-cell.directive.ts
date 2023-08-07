import { Directive, Input, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: 'app-table-card tbody td'
})
export class DataCellDirective {

  @HostBinding("style")
  get cellStyles() {
    return {
      textAlign: (this.align !== "center") ? this.align : undefined,
      verticalAlign: (this.valign !== "center") ? this.valign : undefined,
      whiteSpace: (this.wrap) ? "normal" : undefined,
      minWidth: (this.minWidth) ? this.minWidth : undefined
    };
  }

  @Input() align = "center";
  @Input() valign = "center";
  @Input() wrap = false;
  @Input() minWidth?: string;
}
