export class ErrorHelper {
  static getMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return String(error);
  }

  static create(action: string, details?: string): Error {
    const message = details ? `${action}. ${details}` : action;

    return new Error(message);
  }
}
