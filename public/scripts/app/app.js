'use strict';
var app = angular.module("myApp",[]);
app.controller("MyController",["$scope","$http", function($scope,$http){
        //loadFromServer();
        $scope.initialize = function(){
            $scope.getMoviesForUser();
            $scope.getUsers();
        };
        
        $scope.$watch("searchtext",function(){      /* $watch so that when 'searchtext' is changed, the function is triggered */
            if($scope.searchtext !== undefined && $scope.searchtext !== ""){
                $scope.show = true;
                
                $http.get("https://www.omdbapi.com/?t=" + $scope.searchtext) // + "&plot=full")
                    .then(function(response){
                    /*console.log(response.data);*/
                    $scope.result = response.data;
                    //console.log(response.data);
                }, OnError);
                $http.get("https://www.omdbapi.com/?s=" + $scope.searchtext)
                    .then(function(response){
                    $scope.relatedResult = response.data;
                }, OnAnotherError);
                function OnError(){
                    $scope.result.Response = 'False'; 
                };
                function OnAnotherError(){
                    $scope.relatedResult.Response = 'False';
                }
            }
        });
        
        $scope.update = function(movie){
            $scope.searchtext = movie;
        };
        
        $scope.addMovie = function(movie){
            //console.log(movie);
            $http.post("/movie", movie).then(function(response){
                    $scope.allMovies.push(response.data);
                    $scope.show = false;
                    $scope.searchtext = "";
            });
        };
        
        $scope.getMoviesForUser = function(){
            loadFromServer();
        };
        
        $scope.setSearchText = function(){
            $scope.show = false;
            $scope.searchtext = "";
        };
        
        function loadFromServer(){
            $http.get("/movie").then(function(response){
                $scope.allMovies = response.data;
               /* console.log("From the scope");
                console.log(response.data);*/
                //console.log($scope.allMovies);
            });
        };
        
        $scope.getUsers = function(){
          $http.get("/users").then(function(response) {
             $scope.allUsers = response.data; 
            //  console.log($scope.allUsers);
          });  
        };
        
        
}]);