export class UrlHelper {
  static join(baseUrl: string, path: string): string {
    return new URL(path, baseUrl).toString();
  }
}
