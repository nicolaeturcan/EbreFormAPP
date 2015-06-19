// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ionicApp', ['ionic'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            console.log('Connection type: ' + states[networkState]);
        }
        $interval(function(){
            checkConnection();
        }, 5000)


        document.addEventListener("offline", onOffline, false);

        function onOffline() {
            // Handle the offline event
            alert('you are offline');
        }

    });
});

app.controller('MyCtrl', function ($scope, $http, $window) {

    $scope.items = [];
    $scope.loading = false;

    $scope.updateList = function (id, last_item) {
        $scope.loading = true;
        var Base_URL = 'http://178.62.75.243/api/training_resource/?training_resource_parentResourceId=';
       //var Base_URL = 'http://178.62.75.243/api/training_resource/?training_resource_parentResourceId=';

        console.log("id: " + id);
        console.log("last_id: " + last_item);
        console.log("url: " + Base_URL + id);

        if(id == null){
            id = last_item;
        }
        $http.get(Base_URL + id).
            success(function (data, status, headers, config) {
                $scope.loading = false;
                if (data.length == 0) {
                    //console.log("url: " + data);
                    return;
                } else {
                    $scope.last_item = last_item;
                    $scope.actual_item = id;
                    $scope.items = data;
                    //window.localStorage.setItem("items", JSON.stringify(data));
                }
            })

            //Useless in our aplication for now.
            /*.error(function(data) {
                if(window.localStorage.getItem("items") !== undefined) {
                    $scope.items = JSON.parse(window.localStorage.getItem("items"));
                }
            })*/

            .finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    $scope.init = function () {
        $scope.updateList(0);
    };

    $scope.init();

    $scope.openLink = function (item_URL) {
        console.log("item_URL: " + item_URL);
        $window.open(item_URL);
    };

    $scope.itemInfo = function (item) {
        console.log("Clicked item: " + item.training_resource_id);
        console.log("last_item: " + item.training_resource_parentResourceId);

        if(item.training_resource_parentResourceId == 0){
            $scope.last_item_name = item.training_resource_name;
        }else{
            var Base_URL = 'http://178.62.75.243/api/training_resource/' + item.training_resource_parentResourceId;
            console.log("Base_URL", Base_URL);

            $http.get(Base_URL).
                success(function (data, status, headers, config) {
                    $scope.last_item_name = data.training_resource_name;
                });
        }

        $scope.id = item.training_resource_id;
        $scope.last_item = item.training_resource_parentResourceId;
        $scope.itemData = item;
    };

});
