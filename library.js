(function(module) {
  "use strict";

  var Fix = {},
    winston = module.parent.require('winston'),
    User = require.main.require('./src/user');

  Fix.firstRun = function() {
    User.getUsersFromSet('users:joindate', 1, 0, 200, function(err, result) {
      winston.info("[nodebb-plugin-grab-fix] Found users: " + result.users.length);

      result.users.forEach(function(user) {
        winston.info("[nodebb-plugin-grab-fix] Fix: " + user.uid);
        User.ignoreCategory(user.uid, 21, function() {});
      });
    });
  }

  Fix.userCreate = function(userData) {
    User.ignoreCategory(userData.uid, 21, function() {});
  }

  module.exports = Fix;
}(module));