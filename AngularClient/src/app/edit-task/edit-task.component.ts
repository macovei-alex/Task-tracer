import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { Task } from "../models/task";
import { DropDownListComponent } from "../drop-down-list/drop-down-list.component";

@Component({
  selector: "app-edit-task",
  standalone: true,
  imports: [
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatInputModule,
    DropDownListComponent,
  ],
  templateUrl: "./edit-task.component.html",
  styleUrl: "./edit-task.component.css",
})
export class EditTaskComponent {
  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}

  save(): void {
    this.dialogRef.close(this.data);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
