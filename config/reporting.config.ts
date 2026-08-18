export const reportingConfig = {

  playwrightHtml: {

    outputFolder:
      'playwright-report',

    open:
      'never' as const

  },


  allure: {

    resultsDir:
      'allure-results'

  },


  junit: {

    outputFile:
      'test-results/junit-results.xml'

  },


  blob: {

    outputDir:
      'blob-report'

  }

};