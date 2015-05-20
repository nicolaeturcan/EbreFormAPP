// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
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
        });
    }).controller('MyCtrl', function ($scope, $http) {
        $scope.items = [];
        $scope.loading = false;

        $scope.init = function () {
            $scope.loading = true;
            $http.get('http://trainingresource.app/api/training_resource').
                success(function (data, status, headers, config) {

                    function convert(data) {

                        var map = {};
                        for (var i = 0; i < data.length; i++) {
                            var obj = data[i];
                            obj.items = [];

                            map[obj.training_resource_id] = obj;

                            var parent = obj.training_resource_parentResourceId || '-';
                            if (!map[parent]) {
                                map[parent] = {
                                    items: []
                                };
                            }
                            map[parent].items.push(obj);
                        }

                        return map['-'].items;

                    }
                    var r = convert(data)
                    $scope.items = r;
                    $scope.loading = false;

                });
        }
        $scope.init();

    });