import { EventEmitter, Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private connection!: signalR.HubConnection;
  public notificationSubject: BehaviorSubject<boolean>;
  public notificationEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.notificationSubject = new BehaviorSubject(false);
  }

  initWebSocket() {
    this.connection = new HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("http://localhost:5100/hub/notifications")
      .build();

    this.connection.on("message_received", (body: any) => {
      this.notificationEmitter.emit(body);
      this.notificationSubject.next(true);
    });

    this.connection.start().then(() => {
      console.log("Notifications hub connection started");
    });
  }

  callMethod(methodName: string, parameters?: any[]) {
    this.connection.send(methodName, parameters);
  }
}
