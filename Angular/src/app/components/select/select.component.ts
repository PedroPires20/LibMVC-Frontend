import { Component, Input, OnChanges, ElementRef, HostListener, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnChanges {
  constructor(selectElement: ElementRef) {
    this.selectElementRef = selectElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["options"] || changes["value"]) {
      this.values = (this.optionValues.length > 0) ? this.optionValues : this.options;
    }
  }

  @HostListener("document:click", ["$event"])
  handleDocumentClick(event: MouseEvent) {
    if(!this.selectElementRef.nativeElement.contains(event.target)) {
      this.active = false;
    }
  }

  @Input() name = "";
  @Input() label = "";
  @Input() options: string[] = [];
  @Input() optionValues: string[] = [];
  @Input() placeholder?: string;
  @Input() multiple = false;
  @Input() formVariant = false;
  @Input() errorMessage = "Por favor, selecione uma opção";
  @Input() disabled = false;
  @Input() required = false;

  active = true;
  values = (this.optionValues.length > 0) ? this.optionValues : this.options;
  selectedIndexes: number[] = [];
  private selectElementRef: ElementRef;
}
