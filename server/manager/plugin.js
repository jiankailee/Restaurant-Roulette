function updateObject(o, f) {
  return Object.assign({}, ...Object.keys(o).map(k => ({
    [k]: f(o[k])
  })))
}

function addPlugins(serverState) {
  var controllers = serverState.manager.controller.controllers;
  var pluginNames = serverState.config.plugins;
  var pluginEntries = pluginNames.map(name => ({
    [name]: require(`../plugin/${name}`)(serverState)
  }));
  var plugins = Object.assign({}, ...pluginEntries);

  var pluginClosure = action => (req, res) => action(plugins, req, res);
  var wrapController = controller => updateObject(controller, pluginClosure);

  serverState.manager.controller.controllers = updateObject(controllers, wrapController);

  return serverState;
}

module.exports = addPlugins;
