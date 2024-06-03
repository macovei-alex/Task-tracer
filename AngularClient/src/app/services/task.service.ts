import { Injectable } from "@angular/core";
import { Task } from "../models/task";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { NotificationService } from "./notification.service";
import { LoggingService } from "./logging.service";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  baseURL: string = "http://localhost:5100/tasks";
  readonly httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private logger: LoggingService
  ) {
    this.logger.info("TaskService constructed");
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.baseURL);
  }

  addTask(newTask: Task): Observable<Task> {
    const newTaskJson = <Task>{
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      assignedTo: newTask.assignedTo,
    };

    let observable = this.httpClient.post<Task>(this.baseURL, newTaskJson, {
      headers: this.httpOptions.headers,
      responseType: "text" as "json",
    });
    return observable;
  }

  editTask(task: Task): Observable<Task> {
    let observable = this.httpClient.put<Task>(`${this.baseURL}`, task, {
      headers: this.httpOptions.headers,
      responseType: "text" as "json",
    });

    this.notificationService.callMethod("BroadcastMessage", [
      `Task edited: ${task.id}`,
    ]);

    return observable;
  }

  deleteTask(taskID: string): Observable<void> {
    let observable = this.httpClient.delete<void>(`${this.baseURL}/${taskID}`, {
      headers: this.httpOptions.headers,
      responseType: "text" as "json",
    });

    this.notificationService.callMethod("BroadcastMessage", [
      `Task deleted: ${taskID}`,
    ]);

    return observable;
  }
}
