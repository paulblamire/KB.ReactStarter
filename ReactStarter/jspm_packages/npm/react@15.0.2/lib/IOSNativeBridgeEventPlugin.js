/* */ 
(function(process) {
  'use strict';
  var EventPropagators = require('./EventPropagators');
  var SyntheticEvent = require('./SyntheticEvent');
  var UIManager = require('UIManager');
  var merge = require('merge');
  var warning = require('fbjs/lib/warning');
  var customBubblingEventTypes = UIManager.customBubblingEventTypes;
  var customDirectEventTypes = UIManager.customDirectEventTypes;
  var allTypesByEventName = {};
  for (var bubblingTypeName in customBubblingEventTypes) {
    allTypesByEventName[bubblingTypeName] = customBubblingEventTypes[bubblingTypeName];
  }
  for (var directTypeName in customDirectEventTypes) {
    process.env.NODE_ENV !== 'production' ? warning(!customBubblingEventTypes[directTypeName], 'Event cannot be both direct and bubbling: %s', directTypeName) : void 0;
    allTypesByEventName[directTypeName] = customDirectEventTypes[directTypeName];
  }
  var IOSNativeBridgeEventPlugin = {
    eventTypes: merge(customBubblingEventTypes, customDirectEventTypes),
    extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var bubbleDispatchConfig = customBubblingEventTypes[topLevelType];
      var directDispatchConfig = customDirectEventTypes[topLevelType];
      var event = SyntheticEvent.getPooled(bubbleDispatchConfig || directDispatchConfig, targetInst, nativeEvent, nativeEventTarget);
      if (bubbleDispatchConfig) {
        EventPropagators.accumulateTwoPhaseDispatches(event);
      } else if (directDispatchConfig) {
        EventPropagators.accumulateDirectDispatches(event);
      } else {
        return null;
      }
      return event;
    }
  };
  module.exports = IOSNativeBridgeEventPlugin;
})(require('process'));
