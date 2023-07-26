import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Output folder for default playwright report
  outputDir: 'reports/other',

  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  /* Run tests in files in parallel */
  fullyParallel: true,
  
  // Reporter to use
  reporter: [
    [
      'html', { outputFolder: 'reports/html-report', open: 'never' }
    ],
    [
      'list'
    ]
  ]
});
