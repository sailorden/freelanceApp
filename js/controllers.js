var projectControllers = angular.module('projectControllers', ['ngAnimate']);

projectControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/data.json').success(function(getData) {
    $scope.projects = getData;

    $scope.addProject = function(){

      var dataObj = {
        name: $scope.newProject,
        einnahmen: "",
        ausgaben: ""
      }

      // im Projekt am Server mit namen initialisieren
      // einnahmen und ausgaben sind bei initialisierung noch leer
      // aus dem backend brauchen wir wieder alle projekte zurückgeschickt
      $http.post('/api/addProject', dataObj)
      .success(function(postData, headers, config){
        $scope.projects = postData;
      });

    }; //addProject

  });
}]);

projectControllers.controller('DetailsController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  $http.get('js/data.json').success(function(data) {
    $scope.projects = data;
    $scope.whichItem = $routeParams.itemId;


    $scope.addEinnahme = function(){

      var data = {
        newEinnahme: $scope.amountNewEinnahme,
        projectID: $scope.whichItem
      }

      // einnahmen am Server
      // im Projekt mit mitgelieferter ID updaten (oldEinnahmen + newEinnahme)

      $http.post('api/addEinnahme', data)
      .success(function(data){
        $scope.projects = data;
      });
    };  //addEinnahme

    $scope.addAusgabe = function(){

      var data = {
        newAusgabe: $scope.amountNewAusgabe,
        projectID: $scope.whichItem
      }

      // ausgaben am Server
      // im Projekt mit mitgelieferter ID updaten (oldAusgaben + newAusgabe)

      $http.post('api/addAusgabe', data)
      .success(function(data){
        $scope.projects = data;
      });
    };  //addAusgabe

  });
}]);

