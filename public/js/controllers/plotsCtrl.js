'use strict';
/*
 plot_name: {
 plot_gps: {
 plot_description: {

 */
angular.module('mean.plots').controller('PlotsController', ['$scope', '$rootScope', '$stateParams', '$location', 'Global', 'Plots', 'Cemetery', 'Section', 'Cem', function($scope, $rootScope, $stateParams, $location, Global, Plots, Cemetery, Section, Cem) {
        $scope.global = Global;

        $scope.Plot = {};
        $scope.isNew = true;

        $scope.cemeteries = Cem.getAll();//Cemetery.query();
        $scope.sections = Section.query();

        $scope.create = function() {

        };

        $scope.remove = function(Plots) {
            if (Plots) {
                Plots.$remove();
                for (var i in $scope.Plots) {
                    if ($scope.Plots[i] === Plots) {
                        $scope.Plots.splice(i, 1);
                    }
                }
            }
            else {
                $scope.Plot.$remove();
                $location.path('plots');
            }
        };

        $scope.update = function() {

            var data = $scope.Plot;
            if ($scope.isNew === false) {

                if (!data.updated) {
                    data.updated = [];
                }
                data.updated.push(new Date().getTime());
                data.$update(function() {
                    $location.path('plots/' + data._id);
                });
            } else {
                var data_new = new Plots({
                    plot_cemetery_id: data.plot_cemetery_id,
                    plot_section_id: data.plot_section_id,
                    plot_name: data.plot_name,
                    plot_lat: data.plot_lat,
                    plot_lng: data.plot_lng,
                    plot_gps: data.plot_gps,
                    plot_description: data.plot_description
                });
                data_new.$save(function(response) {
                    $location.path('plots/' + response._id);
                });

                data.plot_name = '';
                data.plot_lat = '';
                data.plot_lng = '';
                data.plot_description = '';
                data.plot_cemetery_id = '';
                data.plot_section_id = '';
                data.plot_gps = '';
            }
        };

        $scope.find = function() {
            Plots.query(function(data) {
                $scope.Plots = data;
            });
        };

        $scope.findOne = function() {
            if ($stateParams.plotId) {
                Plots.get({
                    plotId: $stateParams.plotId
                }, function(data) {
                    $scope.Plot = data;
                    $scope.isNew = false;
                    $rootScope.$broadcast('polmap:show', data.plot_gps.triangleCoords);
                });
            }
        };

        $scope.changeCemetery = function(data) {
            Cem.get(data).then(function(res) {
                if (res !== null) {
                    $rootScope.$broadcast('polmap:centerpoint', {'position': res.acmCemetery_gps});
                }
            }, function(data) {

            });
        };

        $rootScope.$on('polmap:coordsSelected', function(event, data) {
            if ($scope.Plot) {
                $scope.Plot.plot_gps = data;
            }
        });

    }]);