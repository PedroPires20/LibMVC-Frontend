import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent implements ControlValueAccessor {
  handleFocusIn() {
    this.active = true;
  }

  handleFocusOut() {
    this.active = false;
  }

  handleInput(newValue: string) {
    this.value = newValue;
    this.onValueChange(newValue);
  }

  writeValue(value: string) {
    this.value = value;
  }

  handleClearButtonClick(event: Event) {
    this.value = this.defaultValue;
    this.onValueChange(this.defaultValue);
  }

  registerOnChange(fn: any) {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: any) {
    
  }

  @Input() name = "";
  @Input() label = "";
  @Input() supportingText = "";
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() required = false;
  @Input() defaultValue = "";
  @Input() errorMessage = "";


  value = '';
  onValueChange: any = () => {};
  active = false;
  error = false;
}
