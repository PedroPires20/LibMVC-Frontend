import { Component, Input, OnChanges, ElementRef, HostListener, SimpleChanges, forwardRef, ViewChild, Host, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel, NgForm } from '@angular/forms';

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
  constructor(selectElement: ElementRef, @Host() @Optional() parentForm?: NgForm) {
    this._selectElementRef = selectElement;
    this._parentForm = parentForm || null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["options"] || changes["optionValues"]) {
      this.optionValuesMap = (this.optionValues.length > 0) ? this.optionValues : this.options;
      if(Array.isArray(this.value)) {
        this.selectedIndexes = this.value.map((value) => this.optionValuesMap.indexOf(value));
      }else if(this.value && this.value !== "") {
        this.selectedIndexes = [this.optionValuesMap.indexOf(this.value)];
      }else {
        this.selectedIndexes = [];
      }
    }
  }

  @HostListener("document:click", ["$event"])
  handleDocumentClick(event: MouseEvent) {
    if(!this._selectElementRef.nativeElement.contains(event.target)) {
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

  get error() {
    return this._inputModel?.invalid &&
      (this._inputModel?.dirty || this._parentForm?.submitted);
  }

  get inputPlaceholder() {
    return (this.error && this.errorMessage !== "") ? this.errorMessage : this.placeholder;
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

  @ViewChild("inputModel", { static: false })
  private _inputModel!: NgModel;

  private _selectElementRef: ElementRef;
  private _parentForm: NgForm | null;
}
