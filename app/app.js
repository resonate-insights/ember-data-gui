/**
 * User: sirzach
 * Date: 5/24/13
 * Time: 9:58 PM
 */

'use strict';

var store,
    adapter;

adapter = DS.FixtureAdapter.create();

// Create the application store.
store = DS.Store.create({
  revision: 12,
  adapter: adapter
});

// Bootstrap the application.
module.exports = Em.Application.create({
  store : store
});