import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { Router } from "@angular/router";
import { TaskService } from "../services/task.service";
import { Status } from "../models/status-enum";
import { Task } from "../models/task";
import { NotificationService } from "../services/notification.service";
import { DropDownListComponent } from "../drop-down-list/drop-down-list.component";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { Option } from "../models/option";

@Component({
  selector: "app-add-task",
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    DropDownListComponent,
    MatFormField,
    MatLabel,
  ],
  templateUrl: "./add-task.component.html",
  styleUrl: "./add-task.component.css",
})
export class AddTaskComponent {
  taskTitle: string = "";
  taskDescription: string = "";
  taskStatus: Status = Status.ToDo;
  cancel: boolean = false;

  dropDownOptions: Option[] = Object.values(Status).map((status) => {
    return new Option(status, status);
  });

  constructor(
    private router: Router,
    private taskServive: TaskService,
    private notificationService: NotificationService
  ) {}

  onSubmit() {
    if (this.cancel) {
      this.router.navigate(["view"]);
      return;
    }

    let newTask: Task = {
      id: "",
      title: this.taskTitle,
      description: this.taskDescription,
      status: this.taskStatus,
      assignedTo: "Mac",
    };
    this.taskServive.addTask(newTask).subscribe((task) => {
      this.router.navigate(["view"]);
      this.notificationService.callMethod("BroadcastMessage", [
        `Task added: ${newTask.title}`,
      ]);
    });
  }

  onStatusChanged(option: Option) {
    this.taskStatus = option.value;
  }
}
