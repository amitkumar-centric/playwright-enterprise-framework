export const performanceConfig = {
  pageLoad: {
    warning: 3_0,

    maximum: 5_0
  },

  api: {
    warning: 1_0,

    maximum: 2_0
  }
} as const;
