import { Component, Input } from '@angular/core';

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

  @Input() variant: "success" | "delete" | "error" | "load" = "success";
  @Input() heading = "";
  @Input() message = "";
  @Input() detailsSummary = "";
  @Input() detailsContent = "";
  @Input() buttonLabels: string[] = ["Ok"];
}
