"use strict";
// public/js/appRoutes.js
sampleApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/about', {
            templateUrl: 'views/partials/cms/about-us.html',
            controller: 'CmsController'
        })
        .when('/contact', {
            templateUrl: 'views/partials/cms/contact-us.html',
            controller: 'CmsController'
        })
        .when('/signin', {
            templateUrl: 'views/partials/user/signin.html',
            controller: 'authController'
        })
        .when('/signup', {
            templateUrl: 'views/partials/user/signup.html',
            controller: 'authController'
        })
        .when('/user', {
            templateUrl: 'views/partials/user/userinfo.html',
            controller: 'authController'
        });

    $locationProvider.html5Mode(true);

}]);