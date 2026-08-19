export type EnvironmentName = 'dev' | 'qa' | 'staging' | 'prod';

export interface EnvironmentConfig {
  name: EnvironmentName;

  baseUrl: string;

  apiUrl: string;

  timeout: number;
}
