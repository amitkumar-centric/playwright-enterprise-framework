export const locatorConfig = {
  selfHealing: process.env.SELF_HEALING === 'true',

  fallbackTimeout: 1_000
} as const;
