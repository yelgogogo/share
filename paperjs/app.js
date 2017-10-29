var app = angular.module('plunker', [
  'ngRoute',
  'drawControllers'
  ]);
app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/home', {
          templateUrl: './home.html'
        }).
        when('/draw', {
          templateUrl: './draw.html',
          controller: 'drawCtrl'          
        }).
        when('/draw2', {
          templateUrl: './draw2.html',
          controller: 'drawCtrl'          
        }).        
        otherwise({
          redirectTo: '/home'
        });
    }]
);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
});

app.service('drawService', function() {
  
    var objectValue = {
        count: 0,
        width: 160,
        height: 400,
        message: '-',
    };
    
    return {
        getObject: function() {
            return objectValue;
        },
        setCount: function(value) {
            objectValue.count = value;
        },
        setWidth: function(value) {
            objectValue.width = value;
        },
        setMessage: function(value) {
            objectValue.message = value;
        },
        disabled: function() {
            if ( objectValue.count > 0 ){
              return false;
            } else {
              return true;
            }
        }
    }
    
});