'use strict';
/**/
//Articles service used for acmCemetery REST endpoint
angular.module('mean.sections').factory('Sections', ['$resource', function($resource) {
        return $resource('sections/:sectionId', {
            sectionId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        }
        );
    }]
        );

//angular.module('mean.sections').factory('Cemetery', ['$resource', function($resource) {
//        return $resource('/cemeterys', {}, {});
//    }]);
angular.module('mean.sections').factory('Cemetery', ['$resource', function($resource) {
        return $resource('cemeterys/:cemeteryId', {}, {
            query: {method: 'GET', params: {cemeteryId: 'cemeteryId'}}
        });
    }]);


angular.module('mean').factory('AllSections', ['$http', '$rootScope', function($http, $rootScope) {

        var places = [];

        function getSections() {
            var dfd = $.Deferred();
            $http({method: 'GET', url: 'sections'})
                    .success(function(data/*, status, headers, config*/) {
                        places = data;
                        dfd.resolve(data);
                    })
                    .error(function(data/*, status, headers, config*/) {
                        dfd.reject(data);
                    });
            return dfd.promise();
        }

        getSections();

        var service = {};

        service.getAll = function() {
            var dfd = $.Deferred();  
            if (!places || (places.length == 0)) {
                var places = null;
                getSections().then(function(data) {                   
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

        service.getByCemeteryId = function(id) {
            var dfd = $.Deferred();
            var place = null;
            $http({method: 'GET', url: 'sections/' + id})
                    .success(function(data) {
                        place = data;
                        dfd.resolve(data);
                    })
                    .error(function(data) {
                        dfd.reject(data);
                    });
            return dfd.promise();
        };

        service.getById = function(id) {
            var dfd = $.Deferred();
            var place = null;
            $http({method: 'GET', url: 'sections/' + id})
                    .success(function(data) {
                        place = data;
                        dfd.resolve(data);
                    })
                    .error(function(data) {
                        dfd.reject(data);
                    });
            return dfd.promise();
        };

        return service;
    }]);


/*(function () {
 var sectionsFactory = function ($resource, $q) {
 var serviceBase = 'sections/',
 factory = {};

 factory.getCemeterys = function () {
 return $resource('cemeterys').then(
 function (results) {
 return results.data;
 });
 };

 factory.find = function () {
 return $resource(serviceBase + '/:sectionId', {
 sectionId: '@_id'
 });
 };

 factory.update = function () {
 //then does not unwrap data so must go through .data property
 //success unwraps data automatically (no need to call .data property)
 return $resource(serviceBase + '/:sectionId', {
 sectionId: '@_id'
 }, {
 update: {
 method: 'PUT'
 }
 });
 };

 return factory;
 };

 sectionsFactory.$inject = ['$resource', '$q'];

 angular.module('mean.sections').factory('Sections', sectionsFactory);

 }());

 /**/