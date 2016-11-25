"use strict";

sampleApp.controller('authController', function($scope,$http,$location) {
    $scope.tagline = 'To the moon and back!';
    $scope.user  = {username:'',password:''};
    $scope.error_message = '';

    $scope.login = function(user){
        $http.post('/auth/login', user).
        success(function(data) {
            $scope.loggeduser = data;
            $location.path('/user');
        }).
        error(function() {
            $scope.error_message = 'Login failed'
        });

    };

    $scope.signup = function(user){
        $http.post('/auth/signup', user).
        success(function(data) {
            // $scope.alert = data.alert;
            if(data.state == 'success'){
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            }
            else{
                $scope.error_message = data.message;
            }
        }).
        error(function() {
            $scope.error_message = 'Registration failed'
        });

    };

    $scope.userinfo = function() {
        $http.get('/auth/currentuser').
        success(function (data) {
            $scope.loggeduser = data;
        }).
        error(function () {
            $location.path('/signin');
        });
    }

    $scope.logout = function(){
        $http.get('/auth/signout')
            .success(function() {
                $scope.loggeduser = {};
                $location.path('/signin');
            })
            .error(function() {
                $scope.error_message = 'Logout failed'
            });
    };
});