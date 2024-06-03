import { Component } from "@angular/core";
import { Task } from "../models/task";
import { CommonModule } from "@angular/common";
import { TaskCardComponent } from "../task-card/task-card.component";
import { Status } from "../models/status-enum";
import { TaskService } from "../services/task.service";
import { NotificationService } from "../services/notification.service";
import { Subscription } from "rxjs";
import { LoggingService } from "../services/logging.service";

@Component({
  selector: "app-task-grid",
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
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
    private notificationService: NotificationService,
    private logger: LoggingService
  ) {
    this.logger.info("TaskGrid constructed");
  }

  ngOnInit() {
    this.logger.info("TaskGrid initialized");
    this.reloadTaskList();
    this.notificationSubscription =
      this.notificationService.notificationEmitter.subscribe((message) => {
        this.logger.info("TaskGrid notification received: ", message);
        this.reloadTaskList();
      });
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription !== undefined) {
      this.notificationSubscription.unsubscribe();
      this.logger.info("TaskGrid unsubscribed from notification service");
    }
    this.logger.info("TaskGrid destroyed");
  }

  reloadTaskList(): void {
    this.taskService.getTasks().subscribe((taskList: Task[]) => {
      this.taskList = taskList;
      this.logger.info("TaskGrid tasks reloaded: ", this.taskList);
    });
  }

  editTask(task: Task) {
    this.taskService.editTask(task).subscribe((response) => {
      console.log(response);
      this.logger.info("TaskGrid edited task: ", task);
    });
  }

  deleteTask(taskID: string) {
    this.taskService.deleteTask(taskID).subscribe((response) => {
      console.log(response);
      this.logger.info("TaskGrid deleted task: ", taskID);
      this.reloadTaskList();
    });
  }
}
