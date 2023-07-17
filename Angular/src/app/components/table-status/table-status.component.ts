import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-status',
  templateUrl: './table-status.component.html',
  styleUrls: ['./table-status.component.css']
})
export class TableStatusComponent {
  @Input() loading = false;
  @Input() error = false;
  @Input() message = "";
}
