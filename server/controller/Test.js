var index = require('./Index.js')
var req = {body: {term: "cookies", location: "ames"}};

async function test(plugins, req) {
  return {
    results: [
      {name: "There is a name for the restaurant", passing: await has_name(plugins)},
      {name: "There is an address to provide", passing: await has_address(plugins)},
      {name: "There is a phone number for the customer", passing: await has_phone(plugins)},
      {name: "There is a photo to display", passing: await has_photo(plugins)},
      {name: "There is a latitude for the map", passing: await has_latitute(plugins)},
      {name: "There is a longitude for the map", passing: await has_longitude(plugins)},
      {name: "This restaurant has a rating that we can display", passing: await has_rating(plugins)},
      {name: "There is a price indicator for this restaurant", passing: await has_price(plugins)},
      {name: "There is a city for this restaurant", passing: await has_city(plugins)},
      {name: "There is a zip code for this restaurant", passing: await has_zipcode(plugins)},
      {name: "There is a state for this restaurant", passing: await has_state(plugins)},
      {name: "Bad input throws error", passing: await throws_properly(plugins)}
    ]
  };
}

async function has_name(plugins) {
  var result = await index.index(plugins, req)
  console.log(result)
  return result.result.name != null
}

async function has_address(plugins) {
  var result = await index.index(plugins, req)
  return result.result.location.display_address != null
}

async function has_phone(plugins) {
  var result = await index.index(plugins, req)
  return result.result.display_phone != null
}

async function has_photo(plugins) {
  var result = await index.index(plugins,req)
  return result.result.image_url != null
}

async function has_latitute(plugins) {
  var result = await index.index(plugins, req)

  return result.result.coordinates.latitude != null

}

async function has_longitude(plugins) {
  var result = await index.index(plugins, req)
  return result.result.coordinates.longitude != null
}

async function has_rating(plugins) {
  var result = await index.index(plugins, req)
  return result.result.rating != null
}

async function has_price(plugins) {
  var result = await index.index(plugins, req)
  return result.result.price != null
}
async function has_city(plugins) {
  var result = await index.index(plugins, req)
  return result.result.location.city != null
}
async function has_zipcode(plugins) {
  var result = await index.index(plugins, req)
  return result.result.location.zip_code != null
}
async function has_country(plugins) {
  var result = await index.index(plugins, req)
  return result.result.location.country != null
}
async function has_state(plugins) {
  var result = await index.index(plugins, req)
  return result.result.location.state != null
}

async function throws_properly(plugins) {
  var garbage_reqs = {body: {term: "34tgdfs", location: "34trgfd"}}
  var result = await index.index(plugins,garbage_reqs)
  return result.err
}


module.exports = {
  test: test
};
