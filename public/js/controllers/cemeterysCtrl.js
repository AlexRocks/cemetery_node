'use strict';

angular.module('mean.cemeterys').controller('CemeterysController', ['$scope', '$rootScope', '$stateParams', '$location', 'Global', 'Cemeterys', 'ngTableParams', '$filter', '$q', function($scope, $rootScope, $stateParams, $location, Global, Cemeterys, ngTableParams, $filter, $q) {
        $scope.global = Global;

        $scope.Cemetery = {};
		$scope.Cemeterys = [];
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

		$scope.removeid = function(id) {
            if (id) {
                for (var i in $scope.Cemeterys) {
					console.log($scope.Cemeterys[i]._id);
                    if ($scope.Cemeterys[i]._id === id) {
						$scope.Cemeterys[i].$remove(function() {
							console.log("gjgjgjg");
							$location.path('cemeterys');
						});
                        $scope.Cemeterys.splice(i, 1);
                    }
                }
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
			//var deferred = $q.defer();
		
            Cemeterys.query(function(acmCemeterys) {
                $scope.Cemeterys = acmCemeterys;
				//deferred.resolve(acmCemeterys);		
            });
			
			//$scope.Cemeterys = deferred.promise;
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

		$scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10, // count per page
			filter: {
				acmCemetery_name: '',
				user: '',
				acmCemetery_description: ''
            },
			sorting: {
				name: 'asc'     // initial sorting
			}
        }, {
            total: $scope.Cemeterys.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting() ?
                        $filter('orderBy')($scope.Cemeterys, params.orderBy()) :
                        $scope.Cemeterys;

                orderedData = params.filter() ?
                        $filter('filter')(orderedData, params.filter()) :
                        orderedData;
						
                params.total(orderedData.length);

				if (orderedData.length > 0) {				
					$scope.pageData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
					params.total(orderedData.length);
				}
				$defer.resolve($scope.pageData);							
            }
        });
		
		
        $rootScope.$on('map:pointSelected', function(event, data) {
            if ($scope.Cemetery) {
                $scope.Cemetery.acmCemetery_gps = data.position;
            }
        });
    }]);