import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-state-dialog',
  templateUrl: './state-dialog.component.html',
  styleUrls: ['./state-dialog.component.css']
})
export class StateDialogComponent {
  
  get iconPath() {
    switch(this.variant) {
      case "success": return "assets/success_icon.svg";
      case "delete": return "assets/delete_icon_dialog.svg";
      case "error": return "assets/error_icon.svg";
    }
    return "";  
  }
  
  get altMessage() {
    switch(this.variant) {
      case "success": return "sucesso";
      case "delete": return "apagar";
      case "error": return "erro";
    }
    return "";  
  }

  @Input() 
  set variant(value: "success" | "delete" | "error" | "load" | undefined) {
    this._variant = (value) ? value : "success";
  }

  get variant() {
    return this._variant;
  }

  @Input()
  set heading(value: string | undefined) {
    this._heading = value || "";
  }

  get heading(): string {
    return this._heading;
  }

  @Input()
  set message(value: string | undefined) {
    this._message = value || "";
  }

  get message(): string {
    return this._message;
  }

  @Input()
  set detailsSummary(value: string | undefined) {
    this._detailsSummary = value || "";
  }

  get detailsSummary(): string {
    return this._detailsSummary;
  }
  
  @Input()
  set detailsContent(value: string | undefined) {
    this._detailsContent = value || "";
  }

  get detailsContent(): string {
    return this._detailsContent;
  }

  @Input()
  set buttonLabels(value: string[] | undefined) {
    this._buttonLabels = value || ["Ok"];
  }

  get buttonLabels(): string[] {
    return this._buttonLabels;
  }

  @Output() dialogClose = new EventEmitter<number>();

  private _variant: "success" | "delete" | "error" | "load" = "success";
  private _heading: string = "";
  private _message: string = "";
  private _detailsSummary: string = "";
  private _detailsContent: string = "";
  private _buttonLabels: string[] = ["Ok"];
}
