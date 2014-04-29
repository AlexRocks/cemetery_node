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

angular.module('mean').factory('AllCemeteries', ['$http', '$rootScope', function($http, $rootScope) {

        var places = [];

        function getCemeteries() {
            var dfd = $.Deferred();
            
            console.log("Get Cem");

            
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
            var dfd = $.Deferred();  
            if (!places || (places.length == 0)) {
                var places = null;
                getCemeteries().then(function(data) {                   
                    dfd.resolve(data);
                });
            } else {
                dfd.resolve(places);
            }
            
            return dfd.promise();
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