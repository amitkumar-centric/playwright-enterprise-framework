import {
  APIRequestContext,
  APIResponse as PlaywrightApiResponse
} from '@playwright/test';

import { ApiResponse } from './ApiResponse';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async get<T>(
    path: string,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    console.log(`[API] GET ${path}`);

    const response = await this.request.get(path, {
      headers
    });

    console.log(`[API] ${response.status()} ${response.url()}`);

    return this.parseResponse<T>(response);
  }

  async post<T>(
    path: string,
    data?: unknown,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    console.log(`[API] POST ${path}`);

    const response = await this.request.post(path, {
      data,
      headers
    });

    console.log(`[API] ${response.status()} ${response.url()}`);

    return this.parseResponse<T>(response);
  }

  async put<T>(
    path: string,
    data?: unknown,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    console.log(`[API] PUT ${path}`);

    const response = await this.request.put(path, {
      data,
      headers
    });

    console.log(`[API] ${response.status()} ${response.url()}`);

    return this.parseResponse<T>(response);
  }

  async delete<T>(
    path: string,
    data?: unknown,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    console.log(`[API] DELETE ${path}`);

    const response = await this.request.delete(path, {
      data,
      headers
    });

    console.log(`[API] ${response.status()} ${response.url()}`);

    return this.parseResponse<T>(response);
  }

  private async parseResponse<T>(
    response: PlaywrightApiResponse
  ): Promise<ApiResponse<T>> {
    const status = response.status();

    const headers = response.headers();

    const contentType = headers['content-type'] || '';

    const body = await response.text();

    let data: T | null = null;

    if (body) {
      try {
        data = JSON.parse(body) as T;
      } catch {
        console.error(`
[API ERROR]
Unable to parse response as JSON.

Status: ${status}

URL: ${response.url()}

Content-Type: ${contentType}

Body Preview:
${body.substring(0, 300)}
      `);
      }
    }

    return {
      status,

      ok: response.ok(),

      data,

      headers
    };
  }
}
