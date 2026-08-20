export const locatorConfig = {
  get selfHealing(): boolean {
    return process.env.SELF_HEALING === 'true';
  },

  fallbackTimeout: 1_000
};
