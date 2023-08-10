import { Component, Input, Output, EventEmitter, ElementRef, HostListener, HostBinding } from '@angular/core';

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

  @HostBinding("style")
  get hostStyles(): any {
    return {
      top: this.position.y + "px",
      left: this.position.x + "px",
    };
  }

  @HostBinding("attr.tabindex")
  readonly hostTabIndex = 0;

  @Input() loanVariant = false;
  @Input() position: ContextMenuPosition = { x: 0, y: 0 };

  @Output() menuClose = new EventEmitter<number>();

  private contextMenuContainer: ElementRef;
}
