'use strict';
/*
 user_name: {
 user_gps: {
 user_description: {

 */
angular.module('mean.users').controller('UsersController', ['$scope', '$rootScope', '$http', '$stateParams', '$location', 'Global', 'Users', 'Cemetery', 'Section', 'Plot', function($scope, $rootScope, $http, $stateParams, $location, Global, Users) {
        $scope.global = Global;

        $scope.User = {};
        $scope.isNew = true;

        $scope.create = function() {

        };

        $scope.remove = function(Users) {
            if (Users) {
                Users.$remove();
                for (var i in $scope.Users) {
                    if ($scope.Users[i] === Users) {
                        $scope.Users.splice(i, 1);
                    }
                }
            }
            else {
                $scope.User.$remove();
                $location.path('users');
            }
        };

        $scope.update = function() {

            var data = $scope.User;

            if ($scope.isNew === false) {

                if (!data.updated) {
                    data.updated = [];
                }

                data.updated.push(new Date().getTime());
                data.$update(function() {
                    $location.path('users/' + data._id);
                });
            } else {
                var data_new = new Users({
                    name: data.name,
                    email: data.email,
                    username: data.username
                });

                data_new.$save(function(response) {
                    $location.path('users/' + response._id);
                });

                data.name = '';
                data.email = '';
                data.username = '';
            }
        };

        $scope.find = function() {
            Users.query(function(data) {
                $scope.Users = data;
            });
        };

        $scope.findOne = function() {
            if ($stateParams.userId) {
                Users.get({
                    userId: $stateParams.userId
                }, function(data) {
                    $scope.User = data;
                    $scope.isNew = false;
                });
            }
        };
    }]);