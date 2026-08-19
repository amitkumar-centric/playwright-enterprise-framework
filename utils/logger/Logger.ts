import { LogLevel } from './LogLevel';

export interface LogEvent {
  timestamp: string;

  level: LogLevel;

  correlationId: string;

  message: string;

  testName?: string;

  environment?: string;

  browser?: string;

  retry?: number;

  durationMs?: number;
}

export class Logger {
  constructor(private readonly correlationId: string) {}

  private createEvent(
    level: LogLevel,
    message: string,
    metadata: Partial<LogEvent> = {}
  ): LogEvent {
    return {
      timestamp: new Date().toISOString(),

      level,

      correlationId: this.correlationId,

      message,

      ...metadata
    };
  }

  private write(event: LogEvent): void {
    console.log(JSON.stringify(event));
  }

  info(message: string, metadata: Partial<LogEvent> = {}): void {
    this.write(this.createEvent('INFO', message, metadata));
  }

  debug(message: string, metadata: Partial<LogEvent> = {}): void {
    this.write(this.createEvent('DEBUG', message, metadata));
  }

  warn(message: string, metadata: Partial<LogEvent> = {}): void {
    this.write(this.createEvent('WARN', message, metadata));
  }

  error(message: string, metadata: Partial<LogEvent> = {}): void {
    this.write(this.createEvent('ERROR', message, metadata));
  }
}
