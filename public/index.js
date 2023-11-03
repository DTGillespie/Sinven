let app = angular.module('ngApp', ['ngAnimate', 'ui.router']);

app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', 
  function ($httpProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('dashboard', {
        templateUrl: '/controllers/dashboard.html',
        controller: 'dashboardCtrl',
        abstract: true
      })

      .state('main', {
        url: '/',
        templateUrl: 'controllers/main.html',
        controller: 'mainCtrl'
      })

      $urlRouterProvider.otherwise('/main');
}]);