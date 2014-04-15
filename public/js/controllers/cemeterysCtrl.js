'use strict';
/*
 acmCemetery_name: {
 acmCemetery_gps: {
 acmCemetery_description: {

 */
angular.module('mean.cemeterys').controller('CemeterysController', ['$scope', '$rootScope', '$stateParams', '$location', 'Global', 'Cemeterys', function($scope, $rootScope, $stateParams, $location, Global, Cemeterys) {
        $scope.global = Global;

        $scope.Cemetery = {};
        $scope.isNew = true;

        $scope.remove = function(Cemeterys) {
            if (Cemeterys) {
                Cemeterys.$remove();
                for (var i in $scope.Cemeterys) {
                    if ($scope.Cemeterys[i] === Cemeterys) {
                        $scope.Cemeterys.splice(i, 1);
                    }
                }
            }
            else {
                $scope.Cemetery.$remove();
                $location.path('cemeterys');
            }
        };

        $scope.update = function() {

            var acmCemetery = $scope.Cemetery;

            if ($scope.isNew === false) {

                if (!acmCemetery.updated) {
                    acmCemetery.updated = [];
                }
                acmCemetery.updated.push(new Date().getTime());

                acmCemetery.$update(function() {
                    $location.path('cemeterys/' + acmCemetery._id);
                });
            } else {
                var acmCemetery = new Cemeterys({
                    acmCemetery_name: $scope.Cemetery.acmCemetery_name,
                    acmCemetery_gps: $scope.Cemetery.acmCemetery_gps,
                    acmCemetery_lat: $scope.Cemetery.acmCemetery_lat,
                    acmCemetery_lng: $scope.Cemetery.acmCemetery_lng,
                    acmCemetery_description: $scope.Cemetery.acmCemetery_description
                });

                acmCemetery.$save(function(response) {
                    $location.path('cemeterys/' + response._id);
                });

                $scope.Cemetery.acmCemetery_name = '';
                $scope.Cemetery.acmCemetery_lat = '';
                $scope.Cemetery.acmCemetery_lng = '';
                $scope.Cemetery.acmCemetery_description = '';
                $scope.Cemetery.acmCemetery_gps = '';
            }
        };

        $scope.find = function() {
            Cemeterys.query(function(acmCemeterys) {
                $scope.Cemeterys = acmCemeterys;
            });
        };

        $scope.findOne = function() {
            Cemeterys.get({
                cemeteryId: $stateParams.cemeteryId
            }, function(acmCemetery) {
                $scope.Cemetery = acmCemetery;
                $scope.isNew = false;
                $rootScope.$broadcast('map:show', {'position': acmCemetery.acmCemetery_gps, 'p_title': acmCemetery.acmCemetery_name, 'p_description': acmCemetery.acmCemetery_description});
            });
        };

        $rootScope.$on('map:pointSelected', function(event, data) {
            if ($scope.Cemetery) {
                $scope.Cemetery.acmCemetery_gps = data.position;
            }
        });
    }]);