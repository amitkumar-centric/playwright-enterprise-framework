export type MonitoringProvider = 'none' | 'elk' | 'datadog';

export const monitoringConfig = {
  enabled: process.env.MONITORING_ENABLED === 'true',

  provider: (process.env.MONITORING_PROVIDER ?? 'none') as MonitoringProvider,

  serviceName:
    process.env.MONITORING_SERVICE_NAME ?? 'playwright-enterprise-framework',

  environment: process.env.TEST_ENV ?? 'qa',

  datadog: {
    endpoint: process.env.DATADOG_LOG_ENDPOINT,

    apiKey: process.env.DATADOG_API_KEY
  },

  elk: {
    endpoint: process.env.ELK_LOG_ENDPOINT
  }
} as const;
