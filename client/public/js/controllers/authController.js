"use strict";

sampleApp.controller('authController', function($scope,$http,$rootScope,$location) {
    $scope.tagline = 'To the moon and back!';
    $scope.user  = {username:'',password:''};
    $scope.error_message = '';

    /*$scope.login = function(user){
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
    };*/

//login call to webapi (node implemented service)
    $scope.login = function(){
        $http.post('/auth/login', $scope.user).success(function(data){
            if(data.state == 'success'){
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                // $rootScope.sess = data.user;
                $rootScope.loggeduser = data.user;
                sessionStorage.setItem('current_user', $rootScope.loggeduser.username);
                $location.path('/user');
            }
            else{
                $scope.error_message = data.message;
                $rootScope.loggeduser = null;
            }
        });
    };
  //login call to webapi (node implemented service)
    $scope.signup = function(){
        console.log($scope.user);
        $http.post('/auth/signup', $scope.user).success(function(data){
            if(data.state == 'success'){
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            }
            else{
                $scope.error_message = data.message;
            }
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
                $scope.current_user = null;
                $location.path('/signin');
            })
            .error(function() {
                $scope.error_message = 'Logout failed'
            });
    };
});