'use strict';

const { team } = require('./team');

module.exports = function(stage) {
  return new Date(team(stage)[1] || '1919-8-10');
};
