export const executionConfig = {

  local: {
    workers: undefined,
    retries: 0,
    maxFailures: 0
  },

  ci: {
    workers: 2,
    retries: 2,
    maxFailures: 10
  }

};