//add global variables to controller return statements
function mutateControllers(serverState) {
  var controllers = serverState.manager.controller.controllers;
  var navbars = [{
    id: 'main-nav',
    left: {
      type: 'nav nav-pills',
      items: [{
          name: 'Home',
          href: '/'
        },
        {
          name: 'Tests',
          href: '/Test'
        }
      ]
    }
  }];
  var globals = {
    navbars: navbars
  };
  serverState.manager.globals = globals;

  var mutateObject = (o, f) => { //apply a function f to every field in an object o
    Object.keys(o).forEach(k => o[k] = f(o[k]));
    return o;
  };
  //wrapper function to add globals to the results that controller actions returns
  var addViewGlobalsToAction = action =>
    async function(plugins, req, res) {
      return Object.assign(await action(plugins, req, res), globals)
    };

  mutateObject(controllers, controller => mutateObject(controller, addViewGlobalsToAction));

  return serverState;
}

module.exports = mutateControllers;
