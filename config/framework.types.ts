import {
  EnvironmentName
} from './environment.types';

export interface BrowserConfig {
  headless: boolean;
  actionTimeout: number;
  navigationTimeout: number;
}

export interface LoggingConfig {
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
}

export interface PerformanceConfig {
  pageLoadThreshold: number;
  apiResponseThreshold: number;
}

export interface FrameworkConfig {
  environment: EnvironmentName;

  baseUrl: string;

  apiUrl: string;

  timeout: number;

  browser: BrowserConfig;

  logging: LoggingConfig;

  performance: PerformanceConfig;
}