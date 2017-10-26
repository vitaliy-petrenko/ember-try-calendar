/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    autoprefixer: {
      browsers: ['last 2 versions']
    }
  });

  return app.toTree();
};
