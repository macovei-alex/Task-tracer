import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoggingService {
  constructor() {
    console.log("LoggingService constructed");
  }

  info(...messages: any): void {
    console.log(...messages);
  }

  warn(...messages: any): void {
    console.warn(...messages);
  }

  error(...messages: any): void {
    console.error(...messages);
  }
}
