// Promisify function.
// It's universal approach that should work for both synchronous and
// asynchronous functions. It may not produce desired result for specific cases
// (e.g. synchrouns function that takes variable ammount of arguments), choose
// then directly promisifySync or promisifyAsync methods.

'use strict';

var assertCallable = require('es5-ext/lib/Object/assert-callable')
  , apply          = require('../utils/apply')
  , deferred       = require('../../deferred');

module.exports = function () {
	var fn, args;
	assertCallable(this);
	fn = this;
	return function () {
		var d;
		d = deferred();
		apply.call(this, fn, arguments, d.resolve);
		return d.promise;
	};
};