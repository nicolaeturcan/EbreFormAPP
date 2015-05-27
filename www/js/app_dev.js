// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ionicApp', ['ionic']);


app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

app.controller('MyCtrl', function ($scope, $http) {

    var Base_URL ='http://api.ebre-format.com/api/training_resource/parentid/';
    $scope.items = [];
    $scope.loading = false;

    $scope.updateList = function (id, last_item) {
        $scope.loading = true;
        //var idCache = parent_id;
        console.log("id: " + id);
        console.log("last_id: " + last_item);

        $http.get(Base_URL + id).
            success(function (data, status, headers, config) {
                $scope.loading = false;
                if (data.length == 0) {
                    //console.log("url: " + data);
                    //return window.open(data.training_resource_external_url)
                    return ;
                } else {
                    $scope.last_item = last_item;
                    return $scope.items = data;
                }
            }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete')
            });
    }

    $scope.init = function () {
        $scope.updateList(0);
    }
    $scope.init();

});
