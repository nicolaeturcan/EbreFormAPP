// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ionicApp', ['ionic']);

app.controller('MyCtrl', function ($scope, $http) {
    $scope.items = [];
    $scope.loading = false;


    $scope.init = function () {
        $scope.loading = true;
        $http.get('http://trainingresource.app/api/training_resource/parentResourceId/0').
            success(function (data, status, headers, config) {

                $scope.items = data;
                $scope.loading = false;

            });
    }
    $scope.init();

    $scope.showChilds = function (id) {
        $http.get('http://trainingresource.app/api/training_resource/parentResourceId/' + id).
            success(function (data, status, headers, config) {

                var children = data;
                console.log(children);

                if(children.length == 0){
                    return $scope.items;
                }

                //console.log(children);
                return $scope.items = children;

            });
    }


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