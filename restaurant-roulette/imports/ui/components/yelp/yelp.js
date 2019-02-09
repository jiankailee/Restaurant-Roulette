import {Yelp} from '/imports/api/yelp/yelp.js';
import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random'
import './yelp.html';

//When a change, framework redraws view.
export const lastQuery = new ReactiveVar({term: 'restaurant', location: 'ames'});

Template.yelp.onCreated(function() {
  Meteor.subscribe('yelp.current');
});

makeQuery = v => ({term: v.get().term, location: v.get().location});

mockReaciveVar = {
  get: () => ({term: "ames", location: "asfdssdf"})
}

Template.yelp.helpers({
  business() {
    console.log(Yelp.find({
        query: makeQuery(lastQuery)
      }, {limit: 1}).fetch()[0].business);
    return [Yelp.find({
        query: makeQuery(lastQuery)
      }, {limit: 1}).fetch()[0].business];
  }
});

Template.yelp.events({
  'submit .yelp-search' (event) {
    event.preventDefault();
    var query = {
      term: event.target.term.value,
      location: event.target.location.value
    }
    lastQuery.set(query)
    Meteor.call('yelp.search', query.term, query.location)
  }
});
