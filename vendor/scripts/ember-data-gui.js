/**
 * User: sirzach
 * Date: 5/25/13
 * Time: 1:27 AM
 */

(function () {
  window.DS_GUI = {
    root : 'ember-data-gui-root',
    isShown : false
  };

})();

(function () {
  var collectModels = function (app) {
    var models = {
      models : []
    };

    Ember.run.once(function () {
      for (var prop in app) {
        var emberName,
            subclass;

        if( app.hasOwnProperty( prop ) ) {
          prop = app[prop];
          emberName = prop[Ember.GUID_KEY + '_name'];
          debugger;
          if (emberName) {
            subclass = emberName.split('.')[1];
            if (subclass !== 'Router') {
              models.models.push({
                name : emberName
              });
            }
          }
        }
      }
    });

    DS_GUI.models = models;
  };

  DS_GUI.collectModels = collectModels;
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
    $('#' + DS_GUI.root).append(template(models));
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