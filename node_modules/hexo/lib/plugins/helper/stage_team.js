'use strict';

const { team } = require('./team');

module.exports = function(stage) {
  return team(stage)[0] || undefined;
};
