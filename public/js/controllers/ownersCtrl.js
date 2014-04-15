'use strict';

angular.module('mean.owners').controller('OwnersController', ['$scope', '$rootScope', '$http', '$stateParams', '$location', 'Global', 'Owners', function($scope, $rootScope, $http, $stateParams, $location, Global, Owners) {
        $scope.global = Global;

        $scope.Owner = {};
        $scope.isNew = true;

        $scope.create = function() {

        };

        $scope.remove = function(Owner) {
            if (Owner) {
                Owner.$remove();
                for (var i in $scope.Owners) {
                    if ($scope.Owners[i] === Owner) {
                        $scope.Owners.splice(i, 1);
                    }
                }
            }
            else {
                $scope.Owner.$remove();
                $location.path('owners');
            }
        };

        $scope.update = function() {

            var data = $scope.Owner;

            if ($scope.isNew === false) {

                if (!data.updated) {
                    data.updated = [];
                }

                data.updated.push(new Date().getTime());
                data.$update(function() {
                    $location.path('owners/' + data._id);
                });
            } else {

                var owner = new Owners({
                    owner_first_name: data.owner_first_name,
                    owner_middle_name: data.owner_middle_name,
                    owner_last_name: data.owner_last_name,
                    owner_organization: data.owner_organization,
                    owner_billing_address: {
                        address1: data.owner_billing_address.address1,
                        address2: data.owner_billing_address.address2,
                        city: data.owner_billing_address.city,
                        state: data.owner_billing_address.state,
                        country: data.owner_billing_address.country,
                        postalcode: data.owner_billing_address.postalcode,
                        phone: data.owner_billing_address.phone
                    },
                    owner_email: data.owner_email,
                    owner_documents: data.owner_documents,
                    owner_notes: data.owner_notes
                });

                owner.$save(function(response) {
                    $location.path('owners/' + response._id);
                });

                data.owner_first_name = '';
                data.owner_middle_name = '';
                data.owner_last_name = '';
                data.owner_email = '';
                data.owner_documents = '';
                data.owner_notes = '';
                data.owner_billing_address = '';
            }
        };

        $scope.find = function() {
            Owners.query(function(owners) {
                $scope.Owners = owners;
            });
        };

        $scope.findOne = function() {
            if ($stateParams.ownerId) {
                Owners.get({
                    ownerId: $stateParams.ownerId
                }, function(owner) {
                    $scope.isNew = false;
                    $scope.Owner = owner;
                });
            }
        };

        $scope.remove_document = function(value) {

            var data = $scope.Owner;

            if (data.owner_documents) {
                for (var i in data.owner_documents) {
                    if (data.owner_documents[i] === value) {
                        data.owner_documents.splice(i, 1);
                    }
                }
            }
        };

        $scope.download_document = function(value) {
            $http.post('owners/downloadfile/', {}).
                    success(function(data, status, headers, config) {
                        console.log(data); //this contains the raw data of the res.download
                        //from the server.
                    });
        };


        $rootScope.$on('files:complete', function(event, item) {
            var data = $scope.Owner;
            if (item) {
                if (!data.owner_documents) {
                    data.owner_documents = [];
                }
                $scope.$apply(function() {
                    data.owner_documents.push(item.path);
                });
            }
        });

        $rootScope.$on('images:complete', function(event, item) {
            var data = $scope.Owner;
            if (item) {
                if (!data.owner_documents) {
                    data.owner_documents = [];
                }
                $scope.$apply(function() {
                    data.owner_documents.push(item.path);
                });
            }
        });

    }]);