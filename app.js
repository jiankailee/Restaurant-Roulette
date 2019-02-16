var YAML = require('yamljs')
var config = YAML.load('config.yaml');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var opn = require('opn');

//String replaceAll helper function
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

app.set('view engine', 'pug');
app.set('views', './server/views');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

config.static.forEach(x => {
  app.use(express.static('./node_modules/' + x))
});

var serverState = { //represents the entire application state
  config: config,
  express: {
    app: app,
    express: express
  },
  tools: {
    updateObject: (o, f) => Object.assign({}, ...Object.keys(o).map(k => ({
      [k]: f(o[k])
    })))
  },
  manager: {},
}

var managers = config.managerPipeline.map(x => require('./server/manager/' + x)); //require all of the managers
var runManagerPipeline = managers.reduce((f, g) => (x) => g(f(x))); //compose managers into one function

runManagerPipeline(serverState);
delete config.managerPipeline;

app.listen(config.port||process.env.PORT, () => {});

console.log(`Starting on port localhost:${config.port}.`);
