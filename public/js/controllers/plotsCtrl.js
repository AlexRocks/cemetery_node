'use strict';
/*
 plot_name: {
 plot_gps: {
 plot_description: {
 
 */
angular.module('mean.plots').controller('PlotsController', ['$scope', '$rootScope', '$stateParams', '$location', 'Global', 'Plots', 'Cemetery', 'Section', 'AllCemeteries', 'AllSections', 'ngTableParams', '$filter', '$q', function($scope, $rootScope, $stateParams, $location, Global, Plots, Cemetery, Section, AllCemeteries, AllSections, ngTableParams, $filter, $q) {
        $scope.global = Global;

        $scope.Plot = {};
        $scope.Plots = [];
        $scope.isNew = true;

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

        $scope.removeid = function(id) {
            if (id) {
                for (var i in $scope.Plots) {
                    console.log($scope.Plots[i]._id);
                    if ($scope.Plots[i]._id === id) {
                        $scope.Plots[i].$remove(function() {
                            $location.path('plots');
                        });
                        $scope.Plots.splice(i, 1);
                    }
                }
            }
        };

        $scope.update = function() {

            console.log("Update");
            console.info($scope.Plot, $scope.isNew);


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
            console.log("get plots");
            Plots.query(function(data) {
                $scope.Plots = data;
            });
        };

        $scope.findOne = function() {
            console.log("findOne plot:" + $stateParams.plotId);

            if ($stateParams.plotId) {                                             
                Plots.get({
                    plotId: $stateParams.plotId
                }, function(data) {
                    $scope.Plot = data;
                    $scope.isNew = false;
                    
                    $rootScope.$broadcast('polmap:show', data.plot_gps.triangleCoords);
                });
            }
            AllCemeteries.getAll().then(function(data) {
                $scope.cemeteries = data;
            });
            AllSections.getAll().then(function(data) {
                $scope.sections = data;
            });
        };

        $scope.changeCemetery = function(data) {
            AllCemeteries.get(data).then(function(res) {
                if (res !== null) {
                    $rootScope.$broadcast('polmap:centerpoint', {'position': res.acmCemetery_gps});
                }
            }, function(data) {

            });
        };
        
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10, // count per page
            filter: {
                plot_name: '',
                // user: '',
                // section_description: ''
            },
            sorting: {
                name: 'asc'     // initial sorting
            }
        }, {
            total: $scope.Plots.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting() ?
                        $filter('orderBy')($scope.Plots, params.orderBy()) :
                        $scope.Plots;

                orderedData = params.filter() ?
                        $filter('filter')(orderedData, params.filter()) :
                        orderedData;

                params.total(orderedData.length);

                if (orderedData.length > 0) {
                    $scope.pageData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                }
                $defer.resolve($scope.pageData);
            }
        });

        $rootScope.$on('polmap:coordsSelected', function(event, data) {
            if ($scope.Plot) {
                $scope.Plot.plot_gps = data;
            }
        });

    }]);