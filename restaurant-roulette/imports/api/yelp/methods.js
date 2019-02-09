// Methods related to links

import {Meteor} from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';
import {check} from 'meteor/check';
import {Random} from 'meteor/random'
import {Yelp, YelpClient} from './yelp.js';

callApi = (query) => YelpClient.search(query).then(response => {
  businessId = Random.choice(response.jsonBody.businesses).id;
  YelpClient.business(businessId).then(business => {
    console.log(business.jsonBody)
    Yelp.insert({query: query, business:business.jsonBody});
  })
}).catch(e => {
  console.log(e);
});

//Meteor.call('yelp.search', query.term, query.location)

Meteor.methods({
  'yelp.search' (term, location) {
    check(term, String);
    check(location, String);

    var query = {
      term: term,
      location: location
    };
    callApi(query)
  }
});
