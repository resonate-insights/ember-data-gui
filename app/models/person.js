/**
 * User: sirzach
 * Date: 5/24/13
 * Time: 10:43 PM
 */

'use strict';

var Person = DS.Model.extend({
  firstName : DS.attr('string'),

  lastName : DS.attr('string')
});

Person.FIXTURES = [
  {
    id : 1,
    firstName : 'Zach',
    lastName : 'McGonigal'
  }, {
    id : 2,
    firstName : 'Fiona',
    lastName : 'McGonigal'
  }
];

module.exports = Person;
