export interface ApiResponse<T> {
  status: number;

  ok: boolean;

  data: T | null;

  headers: Record<string, string>;
}
