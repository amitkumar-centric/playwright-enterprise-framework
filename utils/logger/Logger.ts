export class Logger {

  constructor(
    private readonly correlationId: string
  ) {}

  debug(
    message: string
  ): void {

    this.write(
      'DEBUG',
      message
    );
  }

  info(
    message: string
  ): void {

    this.write(
      'INFO',
      message
    );
  }

  warn(
    message: string
  ): void {

    this.write(
      'WARN',
      message
    );
  }

  error(
    message: string
  ): void {

    this.write(
      'ERROR',
      message
    );
  }

  private write(
    level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR',
    message: string
  ): void {

    console.log(
      `[${level}] [${this.correlationId}] ${message}`
    );
  }

}
