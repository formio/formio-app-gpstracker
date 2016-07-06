(function() {
  'use strict';

  angular
    .module('formioAppTodo')
    .run([
      '$rootScope',
      'AppConfig',
      'FormioAuth',
      'FormioOffline',
      '$state',
      function(
        $rootScope,
        AppConfig,
        FormioAuth,
        FormioOffline,
        $state
      ) {
        // Initialize the authentication for form.io.
        FormioAuth.init();
        FormioOffline.init();

        $rootScope.$on('formio.unauthorized', function() {
          $rootScope.setUser(null, null);
          $state.go('auth.login', {}, {reload: true});
        });

        // Add the forms to the root scope.
        angular.forEach(AppConfig.forms, function(url, form) {
          $rootScope[form] = url;
        });

        // Determine if a state is active.
        $rootScope.isActive = function(state) {
          return $state.current.name.indexOf(state) !== -1;
        };
      }
    ]);
})();
