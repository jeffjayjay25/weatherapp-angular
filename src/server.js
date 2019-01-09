var app =angular.module('main', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: './components'
    }).otherwise({
        template: '404'
    })
});


app.controller('homeCtrl', function($scope){
       $scope.goToMood =function(){
           $location.path('/login');
       }
})