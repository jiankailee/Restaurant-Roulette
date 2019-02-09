function createRequests(serverState) {
  var controllers = serverState.manager.controller.controllers;
  var routes = serverState.manager.route.routes;

  var getAndPost = (app, route, fn) => {
    app.get(route.path, fn);
    app.post(route.path, fn);
  };

  routes.forEach(route =>
    getAndPost(serverState.express.app, route, (req, res) =>
      controllers[route.controller][route.action](req, res).then(result =>
        res.render(route.path == '' ? 'index' :
          route.path.substring(1), result))));

  return serverState;
}

module.exports = createRequests;
