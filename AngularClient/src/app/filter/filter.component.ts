import { Component } from "@angular/core";
import { Status } from "../models/status-enum";
import { MatButton } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";

@Component({
  selector: "app-filter",
  standalone: true,
  imports: [MatButton, CommonModule, MatIcon],
  templateUrl: "./filter.component.html",
  styleUrl: "./filter.component.css",
})
export class FilterComponent {
  statusList: Status[] = Object.values(Status);
  @Output() statusSelectedEvent: EventEmitter<Status> = new EventEmitter();

  selectStatus(status: Status): void {
    this.statusSelectedEvent.emit(status);
  }
}
