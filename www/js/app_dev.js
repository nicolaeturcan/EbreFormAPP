// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ionicApp', ['ionic']);

    app.controller('aQº 1', function ($scope, $http) {
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

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })
        .state('tabs.home', {
            url: "/home",
            views: {
                'home-tab': {
                    templateUrl: "templates/home.html",
                    controller: 'HomeTabCtrl'
                }
            }
        })
        .state('tabs.facts', {
            url: "/facts",
            views: {
                'home-tab': {
                    templateUrl: "templates/facts.html"
                }
            }
        })
        .state('tabs.facts2', {
            url: "/facts2",
            views: {
                'home-tab': {
                    templateUrl: "templates/facts2.html"
                }
            }
        })
        .state('tabs.about', {
            url: "/about",
            views: {
                'about-tab': {
                    templateUrl: "templates/about.html"
                }
            }
        })
        .state('tabs.navstack', {
            url: "/navstack",
            views: {
                'about-tab': {
                    templateUrl: "templates/nav-stack.html"
                }
            }
        })
        .state('tabs.contact', {
            url: "/contact",
            views: {
                'contact-tab': {
                    templateUrl: "templates/contact.html"
                }
            }
        });


    $urlRouterProvider.otherwise("/tab/home");

})

app.controller('HomeTabCtrl', function ($scope) {
    console.log('HomeTabCtrl');
});