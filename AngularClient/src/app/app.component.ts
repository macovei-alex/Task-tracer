import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { TasksViewComponent } from "./tasks-view/tasks-view.component";
import { HttpClientModule } from "@angular/common/http";
import { NotificationService } from "./services/notification.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    TasksViewComponent,
    RouterLink,
    HttpClientModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "task-tracer";

  constructor(private notificationService: NotificationService) {
    this.notificationService.initWebSocket();
  }
}
