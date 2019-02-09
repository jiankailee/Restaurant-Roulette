
addSubNav = (serverState) => (config) => Object.assign([...serverState.manager.globals.navbars, ...config]);

//Object.assign(serverState.globals.navbar, config);

module.exports = (serverState) => ({
  addSubNav: addSubNav(serverState)
});;
