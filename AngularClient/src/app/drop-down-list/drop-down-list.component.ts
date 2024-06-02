import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatLabel } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatOption, MatOptionSelectionChange } from "@angular/material/core";
import { MatInput } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { Option } from "../models/option";

@Component({
  selector: "app-drop-down-list",
  standalone: true,
  imports: [
    FormsModule,
    MatOption,
    MatLabel,
    MatInput,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: "./drop-down-list.component.html",
  styleUrls: ["./drop-down-list.component.css"],
})
export class DropDownListComponent implements OnInit {
  @Input() options!: Option[];
  selectedOption!: Option;
  @Output() selectEventEmmiter: EventEmitter<Option> = new EventEmitter();

  ngOnInit() {
    this.selectedOption = this.options[0];
  }

  selectOption(option: MatOptionSelectionChange) {
    if (option.source.selected) {
      this.selectedOption = option.source.value;
      this.selectEventEmmiter.emit(this.selectedOption);
    }
  }
}
