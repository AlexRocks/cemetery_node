'use strict';

//Articles service used for acmCemetery REST endpoint
angular.module('mean.plots').factory('Plots', ['$resource', function($resource) {
    return $resource('plots/:plotId', {
        plotId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

angular.module('mean.plots').factory('Cemetery', ['$resource', function($resource) {
    return $resource('/cemeterys', {}, {});
  }]);
  
angular.module('mean.plots').factory('Section', ['$resource', function($resource) {
    return $resource('/sections', {}, {});
  }]);  