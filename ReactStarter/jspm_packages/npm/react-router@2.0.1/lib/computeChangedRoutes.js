/* */ 
'use strict';
exports.__esModule = true;
var _PatternUtils = require('./PatternUtils');
function routeParamsChanged(route, prevState, nextState) {
  if (!route.path)
    return false;
  var paramNames = _PatternUtils.getParamNames(route.path);
  return paramNames.some(function(paramName) {
    return prevState.params[paramName] !== nextState.params[paramName];
  });
}
function computeChangedRoutes(prevState, nextState) {
  var prevRoutes = prevState && prevState.routes;
  var nextRoutes = nextState.routes;
  var leaveRoutes = undefined,
      enterRoutes = undefined;
  if (prevRoutes) {
    (function() {
      var parentIsLeaving = false;
      leaveRoutes = prevRoutes.filter(function(route) {
        if (parentIsLeaving) {
          return true;
        } else {
          var isLeaving = nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
          if (isLeaving)
            parentIsLeaving = true;
          return isLeaving;
        }
      });
      leaveRoutes.reverse();
      enterRoutes = nextRoutes.filter(function(route) {
        return prevRoutes.indexOf(route) === -1 || leaveRoutes.indexOf(route) !== -1;
      });
    })();
  } else {
    leaveRoutes = [];
    enterRoutes = nextRoutes;
  }
  return {
    leaveRoutes: leaveRoutes,
    enterRoutes: enterRoutes
  };
}
exports['default'] = computeChangedRoutes;
module.exports = exports['default'];
