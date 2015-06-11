var projectControllers = angular.module('projectControllers', ['ngAnimate']);

projectControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
  $http.get('http://localhost:1337/projects/').success(function(getData) {
    $scope.projects = getData;

    $scope.addProject = function(){

      var dataObj = {
        name: $scope.newProject,
        einnahmen: 0,
        ausgaben: 0
      }

      // im Projekt am Server mit namen initialisieren
      // einnahmen und ausgaben sind bei initialisierung noch leer
      // aus dem backend brauchen wir wieder alle projekte zurückgeschickt
      $http.post('http://localhost:1337/projects', dataObj)
      .success(function(postData, headers, config){

        $http.get('http://localhost:1337/projects/').success(function(getData) {
          $scope.projects = getData;
        });

        $scope.newProject = "";

      })
      .error(function(data){
        console.log(data);
      });

    }; //addProject

  });
}]);

projectControllers.controller('DetailsController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  $http.get('http://localhost:1337/projects/'+$routeParams.itemId).success(function(data) {
    $scope.projects = data;
    $scope.itemId = $routeParams.itemId;


    $scope.addEinnahme = function(){

      var data = {
        einnahmen: $scope.projects.einnahmen*1 + $scope.amountNewEinnahme*1
        //,projectID: $scope.whichItem
      }

      // einnahmen am Server
      // im Projekt mit mitgelieferter ID updaten (oldEinnahmen + newEinnahme)

      $http.post('http://localhost:1337/projects/'+$scope.itemId, data)
      .success(function(data){
        $scope.projects = data;
        $scope.amountNewEinnahme = ""
      })
      .error(function(data){
        console.log(data);
      });;
    };  //addEinnahme

    $scope.addAusgabe = function(){

      var data = {
        ausgaben: $scope.projects.ausgaben*1 + $scope.amountNewAusgabe*1
        // ,projectID: $scope.whichItem
      }

      // ausgaben am Server
      // im Projekt mit mitgelieferter ID updaten (oldAusgaben + newAusgabe)

      $http.post('http://localhost:1337/projects/'+$scope.itemId, data)
      .success(function(data){
        $scope.projects = data;
        $scope.amountNewAusgabe = ""
      })
      .error(function(data){
        console.log(data);
      });;
    };  //addAusgabe

  });
}]);






