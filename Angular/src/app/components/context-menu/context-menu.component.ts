import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

export interface ContextMenuPosition {
  x: number,
  y: number
}

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {
  constructor(contextMenuContainer: ElementRef) {
    this.contextMenuContainer = contextMenuContainer;
  }

  @HostListener("document:click", ["$event"])
  handleClick(event: MouseEvent) {
    if(!this.contextMenuContainer.nativeElement?.contains(event.target)) {
      this.menuClose.emit();   
    }
  }

  @Input() loanVariant = false;
  @Input() position: ContextMenuPosition = { x: 0, y: 0 };

  @Output() menuClose = new EventEmitter<number>();

  private contextMenuContainer: ElementRef;
}
