(function() {
  'use strict';

  angular
    .module('formioAppTodo')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig(
    $stateProvider,
    $urlRouterProvider,
    FormioResourceProvider,
    FormioAuthProvider,
    FormioOfflineProvider,
    FormioProvider,
    AppConfig
  ) {

    // Set the base url for formio.
    FormioProvider.setBaseUrl(AppConfig.apiUrl);
    FormioProvider.setAppUrl(AppConfig.appUrl);
    FormioOfflineProvider.register({
      errorUrl: '/error',
      homeState: 'home'
    });
    FormioAuthProvider.register('login', 'user', AppConfig.forms.userLoginForm);
    FormioAuthProvider.register('register', 'user', AppConfig.forms.userRegisterForm);
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
          $scope.trails = [];
          $scope.trailsUrl = $rootScope.trailForm + '/submission';
        }]
      });

    // Register the trail routes.
    FormioResourceProvider.register('trail', AppConfig.forms.trailForm, {
      templates: {
        view: 'views/trail/view.html',
        create: 'views/trail/create.html'
      },
      controllers: {
        create: ['$scope', '$window', '$timeout', function($scope, $window, $timeout) {
          $scope.recording = false;
          $scope.submission.data.points = [];
          var recordLocation = function(cb) {
            $window.navigator.geolocation.getCurrentPosition(function(position) {
              $scope.submission.data.points.push({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
              $scope.$apply();
              if (cb) {
                cb();
              }
            });
          };
          $scope.setRecording = function(recording) {
            $scope.recording = recording;
            $scope.nextPoint();
          };
          $scope.nextPoint = function() {
            if ($scope.recording) {
              recordLocation(function() {
                $timeout($scope.nextPoint, 1000);
              });
            }
          };
          recordLocation();
        }]
      }
    });
    $urlRouterProvider.otherwise('/');
  }

})();
