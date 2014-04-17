'use strict';
/*
 user_name: {
 user_gps: {
 user_description: {

 */
angular.module('mean.users').controller('UsersController', ['$scope', '$rootScope', '$http', '$stateParams', '$location', 'Global', 'Users', 'ngTableParams', '$filter', function($scope, $rootScope, $http, $stateParams, $location, Global, Users, ngTableParams, $filter) {
        $scope.global = Global;

        $scope.User = {};
        $scope.Users = [];
        $scope.isNew = true;

//        Administrator: All permissions.
//Staff: All permissions other than create, edit, delete users.
//Registered: A citizen that has registered with the app via the public view of the website and has been approved by an administrator.
//Anonymous: Unregistered public viewer


        $scope.levels = [{name: "Administrator", type: 1},
            {name: "Staff", type: 2},
            {name: "Registered", type: 3}];

        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10, // count per page
            filter: {
                name: '' // initial filter
            }
        }, {
            total: $scope.Users.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting() ?
                        $filter('orderBy')($scope.Users, params.orderBy()) :
                        $scope.Users;

                orderedData = params.filter() ?
                        $filter('filter')(orderedData, params.filter()) :
                        orderedData;

                params.total(orderedData.length);
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

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

            console.log("Updae user");


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
                    user_level: data.user_level,
                    user_first_name: data.user_first_name,
                    user_middle_name: data.user_middle_name,
                    user_last_name: data.user_last_name,
                    user_organization: data.user_organization,
                    user_billing_address: {
                        address1: data.user_billing_address.address1,
                        address2: data.user_billing_address.address2,
                        city: data.user_billing_address.city,
                        state: data.user_billing_address.state,
                        country: data.user_billing_address.country,
                        postalcode: data.user_billing_address.postalcode,
                        phone: data.user_billing_address.phone
                    }
                });

                data_new.$save(function(response) {
                    $location.path('users/' + response._id);
                });

                data.name = '';
                data.email = '';
                data.user_first_name = '';
                data.user_middle_name = '';
                data.user_last_name = '';
                data.user_email = '';
                data.user_documents = '';
                data.user_notes = '';
                data.user_billing_address = '';
            }
        };

        $scope.find = function() {

            console.log("find users");


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