export const performanceConfig = {
  pageLoad: {
    warning: 3_000,

    maximum: 5_000
  },

  api: {
    warning: 1_000,

    maximum: 2_000
  }
} as const;
