import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  handleInput(event: Event) {
    this.searchQueryChange.emit((event.target as HTMLInputElement).value);
  }

  @Input() searchQuery = '';
  @Output() searchQueryChange = new EventEmitter<string>();
}
