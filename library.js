(function(module) {
  "use strict";

  var Fix = {},
    User = require.main.require('./src/user');

  Fix.userCreate = function(userData) {
    User.ignoreCategory(userData.uid, 21, function() {});
  }

  module.exports = Fix;
}(module));