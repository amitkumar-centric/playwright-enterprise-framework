export interface SecurityHeaderResult {
  header: string;
  present: boolean;
  value?: string;
}

export class SecurityHeadersHelper {

  static readonly recommendedHeaders = [
    'strict-transport-security',
    'content-security-policy',
    'x-content-type-options',
    'x-frame-options',
    'referrer-policy'
  ] as const;


  static validateHeaders(
    headers: Record<string, string>
  ): SecurityHeaderResult[] {

    return this.recommendedHeaders.map(
      header => {

        const value =
          headers[header];

        return {
          header,
          present: Boolean(value),
          value
        };

      }
    );
  }


  static getMissingHeaders(
    headers: Record<string, string>
  ): string[] {

    return this
      .validateHeaders(headers)
      .filter(
        result =>
          !result.present
      )
      .map(
        result =>
          result.header
      );
  }


  static hasHeader(
    headers: Record<string, string>,
    headerName: string
  ): boolean {

    return Boolean(
      headers[
        headerName.toLowerCase()
      ]
    );
  }


  static getHeaderValue(
    headers: Record<string, string>,
    headerName: string
  ): string | undefined {

    return headers[
      headerName.toLowerCase()
    ];
  }


  static hasHttpsEnforcement(
    headers: Record<string, string>
  ): boolean {

    return this.hasHeader(
      headers,
      'strict-transport-security'
    );
  }


  static hasContentTypeProtection(
    headers: Record<string, string>
  ): boolean {

    const value =
      this.getHeaderValue(
        headers,
        'x-content-type-options'
      );

    return (
      value
        ?.toLowerCase()
        .includes('nosniff')
      ?? false
    );
  }


  static hasFrameProtection(
    headers: Record<string, string>
  ): boolean {

    return (
      this.hasHeader(
        headers,
        'x-frame-options'
      )
      ||
      this.hasHeader(
        headers,
        'content-security-policy'
      )
    );
  }
}