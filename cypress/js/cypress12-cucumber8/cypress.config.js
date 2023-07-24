const {defineConfig} = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin =
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const {beforeRunHook, afterRunHook} = require('cypress-mochawesome-reporter/lib');


module.exports = defineConfig({
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
