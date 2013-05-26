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
  var collectModels = function (app) {
    var models = {
      models : []
    };

    Ember.run(function () {
      for (var prop in app) {
        var property,
            superclass,
            fields = [];

        if( app.hasOwnProperty( prop ) ) {
          property = app[prop];
          superclass = property['superclass'] ? property['superclass'].toString() : null;
          if (superclass === 'DS.Model') {
            property['eachComputedProperty'](function (name, meta) {
              fields.push(name.toString());
            });
            models.models.push({
              name : property.toString(),
              propertyNames : fields
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
      '<table>' +
          '<thead>' +
            '<tr>' +
              '{{#each propertyNames}}' +
              '<th>{{this}}</th>' +
              '{{/each}}' +
            '</tr>' +
          '</thead>' +
      '</table>';

  var template = Handlebars.compile(source);

  DS_GUI.html.table = template;
})();

(function () {
  var showGui = function () {
    if (DS_GUI.isShown) {
      return;
    }
    var models = DS_GUI.models,
        source = '<ul>' +
            '{{#each models}}' +
            '<li>{{name}}</li>' +
            '{{/each}}' +
                '</ul>',
        template = Handlebars.compile(source);
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