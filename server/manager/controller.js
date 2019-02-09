function createControllers(serverState) {
  var routeList = serverState.manager.route.routes;
  var controllers = routeList.map(route => route.controller).reduce((controllers, controller) => {
    if (controllers[controller]) return controllers;

    controllers[controller] = require('../controller/' + controller);
    return controllers;
  }, {});

  serverState.manager.controller = {
    controllers: controllers
  };

  return serverState;
}

module.exports = createControllers;
