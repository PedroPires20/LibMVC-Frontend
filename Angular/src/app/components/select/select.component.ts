import { Component, Input, OnChanges, ElementRef, HostListener, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }    
  ]
})
export class SelectComponent implements OnChanges, ControlValueAccessor {
  constructor(selectElement: ElementRef) {
    this.selectElementRef = selectElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["options"] || changes["optionValues"]) {
      this.optionValuesMap = (this.optionValues.length > 0) ? this.optionValues : this.options;
    }
  }

  @HostListener("document:click", ["$event"])
  handleDocumentClick(event: MouseEvent) {
    if(!this.selectElementRef.nativeElement.contains(event.target)) {
      this.active = false;
    }
  }

  writeValue(newValue: string | string[]) {
    this.value = newValue;
    if(Array.isArray(newValue)) {
      this.selectedIndexes = newValue.map((value) => this.optionValuesMap.indexOf(value));
    }else if(newValue && newValue !== "") {
      this.selectedIndexes = [this.optionValuesMap.indexOf(this.value)];
    }else {
      this.selectedIndexes = [];
    }
  }
  
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }
  
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  handleOptionClick(event: MouseEvent, optionIndex: number) {
    if(this.disabled) {
      this.active = false;
      event.stopPropagation();
      return;
    }
    if(this.multiple) {
      if(this.selectedIndexes.includes(optionIndex)) {
        this.selectedIndexes = this.selectedIndexes.filter((selectedIndex) => selectedIndex !== optionIndex);
      }else {
        this.selectedIndexes.push(optionIndex);
      }
      this.value = this.selectedIndexes.map((selectedIndex) => this.optionValuesMap[selectedIndex]);
      this.onChange(this.value);
    }else {
      event.stopPropagation();
      this.selectedIndexes = [optionIndex];
      this.active = false;
      this.value = this.optionValuesMap[optionIndex];
      this.onChange(this.value);
    }
  }

  handleClearButtonClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.active = false;
    this.selectedIndexes = [];
    this.value = this.multiple ? [] : "";
    this.onChange(this.value);
  }

  generateInputValue() {
    if(this.selectedIndexes.length > 0) {
      return this.selectedIndexes.map(
        (optionIndex) => this.options[optionIndex]
      ).join("; ");
    }
    return "";
  }

  @Input() name = "";
  @Input() label = "";
  @Input() options: string[] = [];
  @Input() optionValues: any[] = [];
  @Input() placeholder?: string;
  @Input() multiple = false;
  @Input() formVariant = false;
  @Input() errorMessage = "Por favor, selecione uma opção";
  @Input() disabled = false;
  @Input() required = false;
  
  active = false;
  value: string | string[] = "";
  onChange: any = () => {};
  optionValuesMap = (this.optionValues.length > 0) ? this.optionValues : this.options;
  selectedIndexes: number[] = [];
  private selectElementRef: ElementRef;
}
