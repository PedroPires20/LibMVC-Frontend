import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor {
  handleFocusIn() {
    this.active = true;
  }

  handleFocusOut() {
    this.active = false;
  }

  handleInput(newValue: any) {
    this.value = newValue;
    this.onValueChange(this.value);
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  @Input() name = "";
  @Input() label = "";
  @Input() supportingText = "";
  @Input() minDate?: number;
  @Input() maxDate?: number;
  @Input() required = false;
  @Input() errorMessage = "";
  @Input() formVariant = false;

  value: any = '';
  onValueChange: any = () => {};
  active = false;
  error = false;
}
