module.exports = {
  createObject: createObject = (k, v) => ({
    [k]: v
  }),
  subset: subset = (a, b) => Object.keys(a).every(k => b[k]),
  grabKeys: grabKeys = (o, ks) => Object.assign({}, ...Object.keys(o).map(k => createObject(k, o[k]))),
  hasKeys: hasKeys = (o, ks) => subset(Object.assign({}, ...ks.map(k => createObject(k, k))), o)
};
