'use strict';
/*
 section_name: {
 section_gps: {
 section_description: {

 */
angular.module('mean.sections').controller('SectionsController', ['$scope', '$rootScope', '$stateParams', '$location', 'Global', 'Sections', 'Cemetery', 'Cem', 'ngTableParams', '$filter', '$q', function($scope, $rootScope, $stateParams, $location, Global, Sections, Cemetery, Cem, ngTableParams, $filter, $q) {
        $scope.global = Global;

        $scope.Section = {};
        $scope.isNew = true;
        $scope.cemeteries = Cem.getAll();//Cemetery.query();//
		$scope.Sections = [];

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
		
		$scope.removeid = function(id) {
		
			console.log(id);
		
            if (id) {
                for (var i in $scope.Sections) {
					console.log($scope.Sections[i]._id);
                    if ($scope.Sections[i]._id === id) {
						$scope.Sections[i].$remove(function() {
							$location.path('sections');
						});
                        $scope.Sections.splice(i, 1);
                    }
                }
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

		$scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10, // count per page
			filter: {
				section_name: '',
				// user: '',
				// section_description: ''
            },
			sorting: {
				name: 'asc'     // initial sorting
			}
        }, {
            total: $scope.Sections.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting() ?
                        $filter('orderBy')($scope.Sections, params.orderBy()) :
                        $scope.Sections;

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
            if ($scope.Section) {
                $scope.Section.section_gps = data;
            }
        });
    }]);