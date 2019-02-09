function createRoutes(route, currentRoute, routes) {
  if (route.controller && route.action) {
    routes.push({
      path: currentRoute + route.path,
      controller: route.controller,
      action: route.action
    });
  }

  if (route.children)
    routes.concat([].concat.apply(routes, route.children.map(child => createRoutes(child, currentRoute + route.path + '/', routes))));

  return routes;
}

function startCreateRoutes(serverState) {
  serverState.manager.route = {
    routes: createRoutes(serverState.config.routes, '', [])
  }

  return serverState;
};

module.exports = startCreateRoutes;
