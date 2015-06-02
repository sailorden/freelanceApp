var myApp = angular.module('myApp', [
  'ngRoute',
  'projectControllers'
]);



myApp.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.
  when('/projects', {
    templateUrl: 'partials/list.html',
    controller: 'ListController'
  }).
  when('/projects/:itemId', {
    templateUrl: 'partials/details.html',
    controller: 'DetailsController'
  }).
  otherwise({
    redirectTo: '/projects'
  });
  
}]);