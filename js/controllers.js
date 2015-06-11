var projectControllers = angular.module('projectControllers', ['ngAnimate']);

var restAPIUrl = "http://localhost:1337";

projectControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
  $http.get(restAPIUrl+'/projects/').success(function(getData) {
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
      $http.post(restAPIUrl+'/projects', dataObj)
      .success(function(postData, headers, config){

        $http.get(restAPIUrl+'/projects/').success(function(getData) {
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
  $http.get(restAPIUrl+'/projects/'+$routeParams.itemId).success(function(data) {
    $scope.projects = data;
    $scope.itemId = $routeParams.itemId;


    $scope.addEinnahme = function(){

      var data = {
        label: $scope.labelNewEinnahme,
        type: "INCOME",
        value: $scope.amountNewEinnahme*1,
        project: $scope.itemId
      }

      // einnahmen am Server
      // im Projekt mit mitgelieferter ID updaten (oldEinnahmen + newEinnahme)

      $http.post(restAPIUrl+'/accountings/', data)
      .success(function(data){
        $http.get(restAPIUrl+'/projects/'+$scope.itemId).success(function(data) {
          $scope.projects = data;
        });
        $scope.labelNewEinnahme = "";
        $scope.amountNewEinnahme = "";
      })
      .error(function(data){
        console.log(data);
      });;
    };  //addEinnahme

    $scope.addAusgabe = function(){

      var data = {
        label: $scope.labelNewAusgabe,
        type: "EXPENSE",
        value: $scope.amountNewAusgabe*1,
        project: $scope.itemId
      }

      // ausgaben am Server
      // im Projekt mit mitgelieferter ID updaten (oldAusgaben + newAusgabe)

      $http.post(restAPIUrl+'/accountings/', data)
      .success(function(data){
        $http.get(restAPIUrl+'/projects/'+$scope.itemId).success(function(data) {
          $scope.projects = data;
        });
        $scope.labelNewAusgabe = "";
        $scope.amountNewAusgabe = "";
      })
      .error(function(data){
        console.log(data);
      });;
    };  //addAusgabe

  });
}]);






