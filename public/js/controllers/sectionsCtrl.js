'use strict';
/*
 section_name: {
 section_gps: {
 section_description: {

 */
angular.module('mean.sections').controller('SectionsController', ['$scope', '$rootScope', '$stateParams', '$location', 'Global', 'Sections', 'Cemetery', 'Cem', function($scope, $rootScope, $stateParams, $location, Global, Sections, Cemetery, Cem) {
        $scope.global = Global;

        $scope.Section = {};
        $scope.isNew = true;
        $scope.cemeteries = Cem.getAll();//Cemetery.query();//

        $scope.create = function() {

        };

        $scope.remove = function(Sections) {
            if (Sections) {
                Sections.$remove();
                for (var i in $scope.Sections) {
                    if ($scope.Sections[i] === Sections) {
                        $scope.Sections.splice(i, 1);
                    }
                }
            }
            else {
                $scope.Section.$remove();
                $location.path('sections');
            }
        };

        $scope.update = function() {
            var data = $scope.Section;
            if ($scope.isNew === false) {

                if (!data.updated) {
                    data.updated = [];
                }
                data.updated.push(new Date().getTime());
                data.$update(function() {
                    $location.path('sections/' + data._id);
                });
            } else {
                var data_new = new Sections({
                    section_cemetery_id: data.section_cemetery_id,
                    section_name: data.section_name,
                    section_gps: data.section_gps,
                    section_description: data.section_description
                });

                data_new.$save(function(response) {
                    $location.path('sections/' + response._id);
                });

                data.section_name = '';
                data.section_gps = '';
                data.section_description = '';
                data.section_cemetery_id = '';
            }
        };

        $scope.find = function() {
            Sections.query(function(data) {
                $scope.Sections = data;
            });
        };

        $scope.findOne = function() {
            Sections.get({
                sectionId: $stateParams.sectionId
            }, function(data) {
                $scope.isNew = false;
                $rootScope.$broadcast('polmap:show', data.section_gps.triangleCoords);
                $scope.Section = data;
            });
        };

        $scope.changeCemetery = function(data) {
            Cem.get(data).then(function(res) {
                if (res !== null) {
                    $rootScope.$broadcast('polmap:centerpoint', {'position': res.acmCemetery_gps});
                }
            }, function(data) {

            });
        };

        $scope.findCemeterys = function() {

//        Sections.get({
//            sectionId: $stateParams.sectionId
//        }, function(data) {
//            $scope.Section = data;
//        });
//
//        Cemeterys.query(function(data) {
            $scope.Cemeterys = [{'id': 1, 'name': 'Kitty'}, {'id': 2, 'name': 'Mitty'}];
            return $scope.Cemeterys;
//        });
        };


        $rootScope.$on('polmap:coordsSelected', function(event, data) {
            if ($scope.Section) {
                $scope.Section.section_gps = data;
            }
        });
    }]);