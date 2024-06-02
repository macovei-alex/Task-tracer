import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { TaskService } from "./services/task.service";
import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
  providers: [TaskService, provideRouter(routes), provideAnimationsAsync()],
};
