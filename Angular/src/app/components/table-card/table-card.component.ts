import { Component } from '@angular/core';

@Component({
  selector: 'app-table-card',
  template: `
    <table>
      <ng-content select="thead, tbody"/>
    </table>
  `,
  styleUrls: ['./table-card.component.css']
})
export class TableCardComponent {

}
