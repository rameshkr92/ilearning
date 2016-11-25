"use strict";
// public/js/appRoutes.js
sampleApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    // home page
        .when('/', {
            templateUrl: 'views/home.html',
            caseInsensitiveMatch: true,
            controller: 'MainController'
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            caseInsensitiveMatch: true,
            controller: 'MainController'
        })
        .when('/about', {
            templateUrl: 'views/partials/cms/about-us.html',
            caseInsensitiveMatch: true,
            controller: 'CmsController'
        })
        .when('/contact', {
            templateUrl: 'views/partials/cms/contact-us.html',
            caseInsensitiveMatch: true,
            controller: 'CmsController'
        })
        .when('/signin', {
            templateUrl: 'views/partials/user/signin.html',
            caseInsensitiveMatch: true,
            controller: 'authController'
        })
        .when('/signup', {
            templateUrl: 'views/partials/user/signup.html',
            caseInsensitiveMatch: true,
            controller: 'authController'
        })
        .when('/user', {
            templateUrl: 'views/partials/user/userinfo.html',
            caseInsensitiveMatch: true,
            controller: 'authController'
        });

    // $locationProvider.html5Mode(true);

}]);