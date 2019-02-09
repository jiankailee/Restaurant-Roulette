const yelpfusion = require('yelp-fusion');
const apikey = 'vNdvo0Kz8W5hiD4yDstoU94x4vKt86FaSpQVyzMkvrocRDIPYgdE98sgB1y5M27zq4hWLewMnpDkHFpefsSys7zk2GdRri-Gh-DOVVT1ofm1KsINqYKhnMpZcliEWnYx'
const yelpclient = yelpfusion.client(apikey);

const randomElement = x => x[Math.floor(Math.random()*x.length)];

async function searchBusiness(term, location) {
  return JSON.parse((await yelpclient.search({term: term, location: location})).body).businesses;
}

async function businessLookup(id) {
  return JSON.parse((await yelpclient.business(id)).body)
}

async function randomBusiness(term, location) {
  return searchBusiness(term, location)
    .then(o => randomElement(o))
    .catch(err => null)
    .then(o => o)
}

module.exports = serverState => ({
  searchBusiness: searchBusiness,
  randomBusiness: randomBusiness,
  businessLookup: businessLookup
});
