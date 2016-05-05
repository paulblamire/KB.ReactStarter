/* */ 
(function(process) {
  'use strict';
  require('InitializeJavaScriptAppEngine');
  var EventPluginHub = require('./EventPluginHub');
  var EventPluginUtils = require('./EventPluginUtils');
  var IOSDefaultEventPluginOrder = require('./IOSDefaultEventPluginOrder');
  var IOSNativeBridgeEventPlugin = require('./IOSNativeBridgeEventPlugin');
  var ReactElement = require('./ReactElement');
  var ReactComponentEnvironment = require('./ReactComponentEnvironment');
  var ReactDefaultBatchingStrategy = require('./ReactDefaultBatchingStrategy');
  var ReactEmptyComponent = require('./ReactEmptyComponent');
  var ReactNativeComponentEnvironment = require('./ReactNativeComponentEnvironment');
  var ReactNativeGlobalResponderHandler = require('./ReactNativeGlobalResponderHandler');
  var ReactNativeTextComponent = require('./ReactNativeTextComponent');
  var ReactNativeTreeTraversal = require('./ReactNativeTreeTraversal');
  var ReactNativeComponent = require('./ReactNativeComponent');
  var ReactNativeComponentTree = require('./ReactNativeComponentTree');
  var ReactSimpleEmptyComponent = require('./ReactSimpleEmptyComponent');
  var ReactUpdates = require('./ReactUpdates');
  var ResponderEventPlugin = require('./ResponderEventPlugin');
  var invariant = require('fbjs/lib/invariant');
  require('RCTEventEmitter');
  require('RCTLog');
  require('JSTimersExecution');
  function inject() {
    EventPluginHub.injection.injectEventPluginOrder(IOSDefaultEventPluginOrder);
    EventPluginUtils.injection.injectComponentTree(ReactNativeComponentTree);
    EventPluginUtils.injection.injectTreeTraversal(ReactNativeTreeTraversal);
    ResponderEventPlugin.injection.injectGlobalResponderHandler(ReactNativeGlobalResponderHandler);
    EventPluginHub.injection.injectEventPluginsByName({
      'ResponderEventPlugin': ResponderEventPlugin,
      'IOSNativeBridgeEventPlugin': IOSNativeBridgeEventPlugin
    });
    ReactUpdates.injection.injectReconcileTransaction(ReactNativeComponentEnvironment.ReactReconcileTransaction);
    ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
    ReactComponentEnvironment.injection.injectEnvironment(ReactNativeComponentEnvironment);
    var EmptyComponent = function(instantiate) {
      var View = require('View');
      return new ReactSimpleEmptyComponent(ReactElement.createElement(View, {
        collapsable: true,
        style: {position: 'absolute'}
      }), instantiate);
    };
    ReactEmptyComponent.injection.injectEmptyComponentFactory(EmptyComponent);
    ReactNativeComponent.injection.injectTextComponentClass(ReactNativeTextComponent);
    ReactNativeComponent.injection.injectGenericComponentClass(function(tag) {
      var info = '';
      if (typeof tag === 'string' && /^[a-z]/.test(tag)) {
        info += ' Each component name should start with an uppercase letter.';
      }
      !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected a component class, got %s.%s', tag, info) : invariant(false) : void 0;
    });
  }
  module.exports = {inject: inject};
})(require('process'));
