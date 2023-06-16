import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog',
  template: `
    <div class="overlay">
      <div class="container">
        <ng-content/>
      </div>
    </div>
  `,
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

}
