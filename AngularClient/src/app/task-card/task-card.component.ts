import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { Task } from "../models/task";
import { CommonModule } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EditTaskComponent } from "../edit-task/edit-task.component";

@Component({
  selector: "app-task-card",
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIcon],
  templateUrl: "./task-card.component.html",
  styleUrl: "./task-card.component.css",
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() deleteTaskEvent: EventEmitter<string> = new EventEmitter();
  @Output() editTaskEvent: EventEmitter<Task> = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: structuredClone(task),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.editTaskEvent.emit(<Task>result);
    });
  }

  deleteTask(taskID: string): void {
    this.deleteTaskEvent.emit(taskID);
  }
}
