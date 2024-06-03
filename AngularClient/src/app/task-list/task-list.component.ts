import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  Input,
  OnDestroy,
} from "@angular/core";
import { Task } from "../models/task";
import { CommonModule } from "@angular/common";
import { FilterComponent } from "../filter/filter.component";
import { Status } from "../models/status-enum";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { TaskService } from "../services/task.service";
import { MatDialog } from "@angular/material/dialog";
import { EditTaskComponent } from "../edit-task/edit-task.component";
import { NotificationService } from "../services/notification.service";
import { Subscription } from "rxjs";
import { LoggingService } from "../services/logging.service";

@Component({
  selector: "app-task-list",
  standalone: true,
  imports: [CommonModule, FilterComponent, MatIconButton, MatIcon],
  templateUrl: "./task-list.component.html",
  styleUrl: "./task-list.component.css",
})
export class TaskListComponent implements OnInit, OnChanges, OnDestroy {
  taskList!: Task[];
  filteredTasks: Task[] = [];
  selectedStatus: Status | undefined;
  @Input() clearFilters!: number;
  private notificationSubscription!: Subscription;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private logger: LoggingService
  ) {
    this.logger.info("TaskList constructed");
  }

  ngOnInit(): void {
    this.reloadTaskList();
    this.notificationSubscription =
      this.notificationService.notificationEmitter.subscribe((message) => {
        this.logger.info("TaskList notification received: ", message);
        this.reloadTaskList();
      });
    this.logger.info("TaskList initialized");
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription !== undefined) {
      this.notificationSubscription.unsubscribe();
    }
    this.logger.info("TaskList destroyed");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["clearFilters"]) {
      this.changeShowingStatus(undefined);
    }
    this.logger.info("TaskList changed");
  }

  reloadTaskList(): void {
    this.taskService.getTasks().subscribe((taskList: Task[]) => {
      this.taskList = taskList;
      this.changeShowingStatus(undefined);
      this.logger.info("TaskList tasks reloaded: ", this.taskList);
    });
  }

  changeShowingStatus(status: Status | undefined): void {
    if (status === undefined) {
      this.filteredTasks = this.taskList;
    } else {
      this.filteredTasks = this.taskList.filter(
        (task) => task.status === status
      );
    }
    this.selectedStatus = status;
    this.logger.info("TaskList showing status changed: ", status);
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: structuredClone(task),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      this.taskService.editTask(<Task>result).subscribe((response) => {
        this.logger.info("TaskList edit task service response: ", response);
      });
      this.logger.info("TaskList edit task: ", <Task>result);
    });
  }

  deleteTask(taskID: string | undefined): void {
    if (taskID === undefined) {
      return;
    }

    this.taskService.deleteTask(taskID).subscribe((response) => {
      this.logger.info("TaskList task deleted response: ", response);

      this.taskService.getTasks().subscribe((taskList: Task[]) => {
        this.taskList = taskList;
        this.changeShowingStatus(this.selectedStatus);
      });
    });
  }
}
