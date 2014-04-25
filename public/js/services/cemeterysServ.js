'use strict';

//Articles service used for acmCemetery REST endpoint
angular.module('mean.cemeterys').factory('Cemeterys', ['$resource', function($resource) {
        return $resource('cemeterys/:cemeteryId', {
            cemeteryId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);

angular.module('mean').factory('Cem', ['$http', '$rootScope', function($http, $rootScope) {

        var places = [];

        function getCemeteries() {
            var dfd = $.Deferred();
            $http({method: 'GET', url: 'cemeterys'})
                    .success(function(data, status, headers, config) {
                        places = data;
                        dfd.resolve(data);
                    })
                    .error(function(data, status, headers, config) {
                        dfd.reject(data);
                    });
            return dfd.promise();
        }

        getCemeteries();

        var service = {};

        service.getAll = function() {
            if (!(places.length > 0)) {
                getCemeteries().then(function(data) {
                    // return places;
					return data;
                });
            } else {
                return places;
            }

        };

        service.get = function(id) {
            var dfd = $.Deferred();
            var place = null;
            angular.forEach(places, function(value) {
                if (value._id === id) {
                    place = value;
                    return false;
                }
            });
            dfd.resolve(place);
            return dfd.promise();
        };

        service.getById = function(id) {
            var dfd = $.Deferred();
            var place = null;
            $http({method: 'GET', url: 'cemeterys/' + id})
                    .success(function(data, status, headers, config) {
                        place = data;
                        dfd.resolve(data);
                    })
                    .error(function(data, status, headers, config) {
                        dfd.reject(data);
                    });
            //return place;
            return dfd.promise();
        };

        return service;
    }]);