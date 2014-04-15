'use strict';
/*
 marker_name: {
 marker_gps: {
 marker_description: {

 */
angular.module('mean.markers').controller('MarkersController', ['$scope', '$rootScope', '$http', '$stateParams', '$location', 'Global', 'Markers', 'Cemetery', 'Section', 'Plot', function($scope, $rootScope, $http, $stateParams, $location, Global, Markers, Cemetery, Section, Plot) {
        $scope.global = Global;

        $scope.Marker = {};
        $scope.isNew = true;

        $scope.cemeteries = Cemetery.query();
        $scope.sections = Section.query();
        $scope.plots = Plot.query();

        $scope.create = function() {

        };

        $scope.remove = function(Markers) {
            if (Markers) {
                Markers.$remove();
                for (var i in $scope.Markers) {
                    if ($scope.Markers[i] === Markers) {
                        $scope.Markers.splice(i, 1);
                    }
                }
            }
            else {
                $scope.Marker.$remove();
                $location.path('markers');
            }
        };

        $scope.update = function() {

            var data = $scope.Marker;

            if ($scope.isNew === false) {

                if (!data.updated) {
                    data.updated = [];
                }

                data.updated.push(new Date().getTime());
                data.$update(function() {
                    $location.path('markers/' + data._id);
                });
            } else {
                var data_new = new Markers({
                    marker_cemetery_id: data.marker_cemetery_id,
                    marker_section_id: data.marker_section_id,
                    marker_plot_id: data.marker_plot_id,
                    marker_name: data.marker_name,
                    marker_gps: data.marker_gps,
                    marker_lat: data.marker_lat,
                    marker_lng: data.marker_lng,
                    marker_description: data.marker_description,
                    marker_documents: data.marker_documents,
                    marker_images: data.marker_images
                });

                data_new.$save(function(response) {
                    $location.path('markers/' + response._id);
                });

                data.marker_name = '';
                data.marker_lat = '';
                data.marker_lng = '';
                data.marker_description = '';
                data.marker_cemetery_id = '';
                data.marker_section_id = '';
                data.marker_plot_id = '';
                data.marker_gps = '';
                data.marker_documents = [];
                data.marker_images = [];
            }
        };

        $scope.find = function() {
            Markers.query(function(data) {
                $scope.Markers = data;
            });
        };

        $scope.findOne = function() {
            if ($stateParams.markerId) {
                Markers.get({
                    markerId: $stateParams.markerId
                }, function(data) {
                    $scope.Marker = data;
                    $scope.isNew = false;
                    $rootScope.$broadcast('map:show', {'position': data.marker_gps, 'p_title': data.marker_name, 'p_description': data.marker_description});
                });
            }
        };


        $scope.remove_document = function(value) {

            var data = $scope.Marker;

            if (data.marker_documents) {
                for (var i in data.marker_documents) {
                    if (data.marker_documents[i] === value) {
                        data.marker_documents.splice(i, 1);
                    }
                }
            }
        };

        $scope.remove_image = function(value) {

            var data = $scope.Marker;

            if (data.marker_images) {
                for (var i in data.marker_images) {
                    if (data.marker_images[i] === value) {
                        data.marker_images.splice(i, 1);
                    }
                }
            }
        };

        $scope.download_document = function(value) {

            console.log('download_document');

            console.log(value);

            $http.post('markers/downloadfile/', {}).
                    success(function(data, status, headers, config) {
                        console.log(data); //this contains the raw data of the res.download
                        //from the server.
                    });


//            $location.path('markers/downloadfile/');
        };



        $rootScope.$on('files:complete', function(event, item) {
            var data = $scope.Marker;
            if (item) {
                if (!data.marker_documents) {
                    data.marker_documents = [];
                }
                $scope.$apply(function() {
                    data.marker_documents.push({'file': item.file, 'path': item.path});
                });
            }
        });

        $rootScope.$on('images:complete', function(event, item) {
            var data = $scope.Marker;
            if (item) {
                if (!data.marker_images) {
                    data.marker_images = [];
                }
                $scope.$apply(function() {
                    data.marker_images.push({'file': item.file, 'path': item.path});
                });
            }
        });


        $rootScope.$on('map:pointSelected', function(event, data) {
            if ($scope.Marker) {
                $scope.Marker.marker_gps = data.position;
            }
        });

    }]);