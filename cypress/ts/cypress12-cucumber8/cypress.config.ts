import {defineConfig} from 'cypress';
import * as createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import {addCucumberPreprocessorPlugin} from '@badeball/cypress-cucumber-preprocessor';
import {createEsbuildPlugin} from '@badeball/cypress-cucumber-preprocessor/esbuild';
import {beforeRunHook, afterRunHook} from 'cypress-mochawesome-reporter/lib';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    reportDir: 'reports/mochawesome',
  },

  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      require('cypress-mochawesome-reporter/plugin')(on);

      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, config);

      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('task', {
        getNodeVersion: () => {
          return process.versions.node;
        },
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });

      return config;
    },
    specPattern: 'cypress/e2e/**/*.feature',
  },
});
