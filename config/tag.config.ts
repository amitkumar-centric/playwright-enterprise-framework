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
  quarantine: '@quarantine',

  // Security / performance
  security: '@security',
  performance: '@performance',

  cloud: '@cloud',
  crossBrowser: '@cross-browser',
  mobile: '@mobile',
   responsive: '@responsive',
} as const;
