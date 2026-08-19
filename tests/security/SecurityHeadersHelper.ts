export class SecurityHeadersHelper {
  static requiredHeaders(): string[] {
    return [
      'strict-transport-security',
      'x-content-type-options',
      'content-security-policy'
    ];
  }

  static missingHeaders(headers: Record<string, string>): string[] {
    return this.requiredHeaders().filter((header) => !headers[header]);
  }
}
