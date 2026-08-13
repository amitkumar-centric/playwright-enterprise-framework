export const frameworkDefaults = {

  browser: {
    headless: true,
    actionTimeout: 10000,
    navigationTimeout: 30000
  },

  logging: {
    level: 'INFO' as const
  },

  performance: {
    pageLoadThreshold: 5000,
    apiResponseThreshold: 2000
  }

};