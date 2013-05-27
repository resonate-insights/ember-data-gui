/**
 * User: sirzach
 * Date: 5/25/13
 * Time: 1:27 AM
 */

(function () {
  window.DS_GUI = {
    root : 'ember-data-gui-root',
    isShown : false,
    html : {}
  };

})();

(function () {
  Handlebars.registerHelper('debugger', function() {
    debugger;
  });
})();

(function () {
  var collectModels = function (app) {
    var models = {
      models : []
    };

    app.Person.createRecord({
      id : 1,
      firstName : 'user1',
      lastName : 'user1lastname'
    });

    app.Person.createRecord({
      id : 2,
      firstName : 'user2',
      lastName : 'user2lastname'
    });

    Ember.run(function () {
      for (var prop in app) {
        var property,
            superclass,
            type,
            propertyString,
            fields = [],
            records = [],
            entries = [],
            modelProperties;

        if( app.hasOwnProperty( prop ) ) {

          property = app[prop];
          superclass = property['superclass'] ? property['superclass'].toString() : null;

          if (superclass === 'DS.Model') {

            propertyString = property.toString();
            property['eachComputedProperty'](function (name, meta) {
              fields.push(name.toString());
            });

            records = app.store.get('defaultTransaction.records');
            records.forEach(function (record) {
              type = record.toString().split(':')[0].substring(1).toString();

              if (type === propertyString) {

                modelProperties = [];
                fields.forEach(function (field) {
                  modelProperties.push(record.get(field));
                });

                entries.push(modelProperties);
              }
            });

            models.models.push({
              name : property.toString(),
              propertyNames : fields,
              entries : entries
            });
          }
        }
      }
    });

    DS_GUI.models = models;
  };

  DS_GUI.collectModels = collectModels;
})();

(function () {
  var source =
      '<table class="table">' +
          '<thead>' +
            '<tr>' +
              '{{#each propertyNames}}' +
              '<th>{{this}}</th>' +
              '{{/each}}' +
            '</tr>' +
          '</thead>' +
          '{{#each entries}}' +
            '<tr>' +
                '{{#each this}}' +
                  '<td>{{this}}</td>' +
                '{{/each}}' +
            '</tr>' +
          '{{/each}}' +
      '</table>';

  var template = Handlebars.compile(source);

  DS_GUI.html.table = template;
})();

(function () {
  var showGui = function () {
    if (DS_GUI.isShown) {
      return;
    }

    var models = DS_GUI.models;

    $('#' + DS_GUI.root).append(DS_GUI.html.table(models.models[0]));
    DS_GUI.isShown = true;
  };

  DS_GUI.showGui = showGui;
})();

(function () {
  Ember.onLoad('Ember.Application', function(Application) {
    Application.initializer({
      name : 'gui-store',

      initialize: function(container, application) {
        DS_GUI.store = application.store;
        DS_GUI.app = application;
        DS_GUI.collectModels(application);
      }
    });
  });
})();