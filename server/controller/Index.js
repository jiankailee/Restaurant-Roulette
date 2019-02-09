async function index(plugins, req) {
  term = req.body.term
  location = req.body.location
  if(!term || !location)
  {
    return {
      empty_state: "Please fill out the form.",
      err: false
    }
  }
  randomBusiness = await plugins.yelp.randomBusiness(term, location)
  result = randomBusiness ? await plugins.yelp.businessLookup(randomBusiness.id) : null;
  return {
     result: result,
     err: randomBusiness ? false : true
  };
}

module.exports = {
  index: index
};
