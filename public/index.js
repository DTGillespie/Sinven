const app = angular.module('ngApp', ['ngAnimate', 'ui.router']);

app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', 
  function ($httpProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardCtrl',
        abstract: true
      })
      .state('main', {
        url: '/main',
        parent: 'dashboard',
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
      });

    $urlRouterProvider.otherwise('/main');
}]);