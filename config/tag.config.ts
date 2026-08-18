export const Tags = {

  // Test suite
  smoke: '@smoke',
  regression: '@regression',

  // Priority
  critical: '@critical',

  // Test type
  ui: '@ui',
  api: '@api',
  integration: '@integration',

  // Environment safety
  prodSafe: '@prod-safe',
  nonProd: '@non-prod',

  // Special handling
  flaky: '@flaky',

  // Security / performance
  security: '@security',
  performance: '@performance'

} as const;