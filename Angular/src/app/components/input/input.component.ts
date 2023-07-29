import { Component, Input, ViewChild, forwardRef, Host, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  constructor(@Host() @Optional() parentForm?: NgForm) {
    this._parentForm = parentForm || null;
  }

  writeValue(newValue: any) {
    this.value = newValue;
  }
  
  registerOnChange(fn: any) {
    this.onValueChange = fn;
  }
  
  registerOnTouched(fn: any) {

  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  handleInput(newValue: any) {
    if(this.type === "number") {
      this.value = parseFloat(newValue);
    }else {
      this.value = newValue;
    }
    this.onValueChange(this.value);
  }

  handleFocusIn() {
    this.active = true;
  }

  handleFocusOut() {
    this.active = false;
  }

  handleClearButtonClick(event: MouseEvent) {
    event.preventDefault();
    this.value = "";
    this.onValueChange("");
  }

  get error() {
    return this._inputModel.invalid &&
      (this._inputModel.dirty || this._inputModel.touched || this._parentForm?.submitted);
  }

  @Input() name = "";
  @Input() label = "";
  @Input() supportingText = "";
  @Input() type = "text";
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() minValue?: number;
  @Input() maxValue?: number;
  @Input() step?: number;
  @Input() validationPattern?: string;
  @Input() required = false;
  @Input() autofocus = false;
  @Input() defaultValue = "";
  @Input() errorMessage = "";

  value: any = "";
  onValueChange: any = () => {};
  disabled = false;
  active = false;

  @ViewChild("inputModel", { static: true })
  private _inputModel!: NgModel;
  
  private _parentForm: NgForm | null;
}
