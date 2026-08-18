export class JsonHelper {

  static stringify(
    value: unknown
  ): string {

    try {
      return JSON.stringify(
        value,
        null,
        2
      );
    } catch {
      return '[Unable to serialize value]';
    }
  }
}