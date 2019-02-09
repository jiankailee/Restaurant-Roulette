var createObject = (k, v) => ({
  [k]: v
});
var subset = (a, b) => Object.keys(a).every(k => b[k]);
var grabKeys = (o, ks) => Object.assign({}, ...Object.keys(o).map(k => createObject(k, o[k])));
var hasKeys = (o, ks) => subset(Object.assign({}, ...ks.map(k => createObject(k, k))), o);

module.exports = serverState => ({
  subset: subset,
  createObject: createObject,
  grabKeys: grabKeys,
  hasKeys: hasKeys
});
