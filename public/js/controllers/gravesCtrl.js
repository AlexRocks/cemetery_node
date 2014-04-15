'use strict';

angular.module('mean.graves').controller('GravesController', ['$scope', '$rootScope', '$http', '$stateParams', '$location', 'Global', 'Graves', 'Marker', 'Cemetery', 'Section', 'Plot', 'Owner', function($scope, $rootScope, $http, $stateParams, $location, Global, Graves, Marker, Cemetery, Section, Plot, Owner) {
        $scope.global = Global;

        $scope.Grave = {};
        $scope.isNew = true;

        $scope.markers = Marker.query();
        $scope.cemeteries = Cemetery.query();
        $scope.sections = Section.query();
        $scope.plots = Plot.query();
        $scope.owners = Owner.query();

        $scope.create = function() {

        };

        $scope.remove = function(Grave) {
            if (Grave) {
                Grave.$remove();

                for (var i in $scope.Graves) {
                    if ($scope.Graves[i] === Grave) {
                        $scope.Graves.splice(i, 1);
                    }
                }
            }
            else {
                $scope.Grave.$remove();
                $location.path('graves');
            }
        };

        $scope.update = function() {

            var data = $scope.Grave;

            if ($scope.isNew === false) {

                if (!data.updated) {
                    data.updated = [];
                }

                data.updated.push(new Date().getTime());
                data.$update(function() {
                    $location.path('graves/' + data._id);
                });
            } else {

                console.info(data);


                var grave = new Graves({
                    grave_first_name: data.grave_first_name,
                    grave_middle_name: data.grave_middle_name,
                    grave_last_name: data.grave_last_name,
                    grave_birth_date: data.grave_birth_date,
                    grave_death_date: data.grave_death_date,
                    grave_interment_date: data.grave_interment_date,
                    grave_purchase_date: data.grave_purchase_date,
                    grave_purchase_price: data.grave_purchase_price,
                    grave_description: data.grave_description,
                    grave_documents: data.grave_documents,
                    grave_cemetery_id: data.grave_cemetery_id,
                    grave_section_id: data.grave_section_id,
                    grave_plot_id: data.grave_plot_id,
                    grave_marker_id: data.grave_marker_id,
                    grave_owner_id: data.grave_owner_id
                });

                console.log(grave);


                grave.$save(function(response) {
                    $location.path('graves/' + response._id);
                });

                data.grave_first_name = '';
                data.grave_middle_name = '';
                data.grave_last_name = '';
                data.grave_birth_date = '';
                data.grave_death_date = '';
                data.grave_interment_date = '';
                data.grave_purchase_date = '';
                data.grave_purchase_price = '';
                data.grave_description = '';
                data.grave_documents = '';
                data.grave_cemetery_id = '';
                data.grave_section_id = '';
                data.grave_plot_id = '';
                data.grave_marker_id = '';
                data.grave_owner_id = '';
            }
        };

        $scope.find = function() {
            Graves.query(function(graves) {
                $scope.Graves = graves;
            });
        };

        $scope.findOne = function() {
            if ($stateParams.graveId) {
                Graves.get({
                    graveId: $stateParams.graveId
                }, function(grave) {
                    $scope.isNew = false;
                    $scope.Grave = grave;
                });
            }
        };

        $scope.remove_document = function(value) {

            var data = $scope.Grave;

            if (data.grave_documents) {
                for (var i in data.grave_documents) {
                    if (data.grave_documents[i] === value) {
                        data.grave_documents.splice(i, 1);
                    }
                }
            }
        };

        $scope.download_document = function(value) {
            $http.post('graves/downloadfile/', {}).
                    success(function(data, status, headers, config) {
                        console.log(data); //this contains the raw data of the res.download
                        //from the server.
                    });
        };


        $rootScope.$on('files:complete', function(event, item) {

            console.log('files:complete');


            var data = $scope.Grave;
            if (item) {
                if (!data.grave_documents) {
                    data.grave_documents = [];
                }
                $scope.$apply(function() {
                    data.grave_documents.push({'file': item.file, 'path': item.path});
                });
            }
        });

        $rootScope.$on('images:complete', function(event, item) {
            var data = $scope.Grave;
            if (item) {
                if (!data.grave_documents) {
                    data.grave_documents = [];
                }
                $scope.$apply(function() {
                    data.grave_documents.push({'file': item.file, 'path': item.path});
                });
            }
        });

    }]);