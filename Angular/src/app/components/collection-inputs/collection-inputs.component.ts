import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collection-inputs',
  templateUrl: './collection-inputs.component.html',
  styleUrls: ['./collection-inputs.component.css']
})
export class CollectionInputsComponent {

  @Input() disabled = false;
}
