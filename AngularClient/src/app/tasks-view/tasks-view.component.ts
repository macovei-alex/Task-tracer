import { ChangeDetectorRef, Component } from "@angular/core";
import { TaskGridComponent } from "../task-grid/task-grid.component";
import { Status } from "../models/status-enum";
import { TaskListComponent } from "../task-list/task-list.component";
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { FilterComponent } from "../filter/filter.component";
import { LoggingService } from "../services/logging.service";

@Component({
  selector: "app-tasks-view",
  standalone: true,
  imports: [
    TaskGridComponent,
    TaskListComponent,
    MatIcon,
    CommonModule,
    FilterComponent,
  ],
  templateUrl: "./tasks-view.component.html",
  styleUrl: "./tasks-view.component.css",
})
export class TasksViewComponent {
  isList: boolean = true;
  notificationMessage: string = "";
  listSelectedStatus: Status | undefined;
  clearListFiltersTrigger: number = 0;

  constructor(private logger: LoggingService) {
    this.logger.info("TasksView constructed");
  }

  reload(): void {
    this.clearListFiltersTrigger++;
    this.logger.info("TasksView reloaded");
  }
}
