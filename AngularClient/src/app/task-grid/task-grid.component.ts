import { Component } from "@angular/core";
import { Task } from "../models/task";
import { CommonModule } from "@angular/common";
import { TaskCardComponent } from "../task-card/task-card.component";
import { Status } from "../models/status-enum";
import { TaskService } from "../services/task.service";
import { NotificationService } from "../services/notification.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-task-grid",
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  providers: [TaskService],
  templateUrl: "./task-grid.component.html",
  styleUrl: "./task-grid.component.css",
})
export class TaskGridComponent {
  statuses: Status[] = Object.values(Status);
  taskList!: Task[];
  Status = Status;
  private notificationSubscription!: Subscription;

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.reloadTaskList();
    this.notificationSubscription =
      this.notificationService.notificationEmitter.subscribe((message) => {
        console.log("Notification received: ", message);
        this.reloadTaskList();
      });
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription !== undefined) {
      this.notificationSubscription.unsubscribe();
    }
  }

  reloadTaskList(): void {
    this.taskService.getTasks().subscribe((taskList: Task[]) => {
      this.taskList = taskList;
    });
  }

  editTask(task: Task) {
    this.taskService.editTask(task).subscribe((response) => {
      console.log(response);
    });
  }

  deleteTask(taskID: string) {
    this.taskService.deleteTask(taskID).subscribe((response) => {
      console.log(response);
      this.reloadTaskList();
    });
  }
}
