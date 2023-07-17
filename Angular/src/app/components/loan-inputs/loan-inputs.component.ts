import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loan-inputs',
  templateUrl: './loan-inputs.component.html',
  styleUrls: ['./loan-inputs.component.css']
})
export class LoanInputsComponent {

  @Input() disabled = false;
}
