(function(module) {
  "use strict";

  var Fix = {},
    winston = module.parent.require('winston'),
    User = require.main.require('./src/user');

  Fix.firstRun = function(params, callback) {
    winston.info("[nodebb-plugin-grab-fix] run");

    User.getUsersFromSet('users:joindate', 1, 1, 200, function(err, users) {
      if (err) {
        winston.error(err);
        callback();
        return;
      }

      users.forEach(function(user) {
        winston.info("[nodebb-plugin-grab-fix] Fix: " + user.uid);
        User.ignoreCategory(user.uid, 21, function() {});
      });
    });

    callback();
  }

  Fix.userCreate = function(userData) {
    User.ignoreCategory(userData.uid, 21, function() {});
  }

  module.exports = Fix;
}(module));