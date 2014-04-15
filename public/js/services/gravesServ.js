'use strict';

//Articles service used for graves REST endpoint
angular.module('mean.graves').factory('Graves', ['$resource', function($resource) {
        return $resource('graves/:graveId', {
            graveId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);


angular.module('mean.graves').factory('Cemetery', ['$resource', function($resource) {
        return $resource('/cemeterys', {}, {});
    }]);
angular.module('mean.graves').factory('Section', ['$resource', function($resource) {
        return $resource('/sections', {}, {});
    }]);
angular.module('mean.graves').factory('Plot', ['$resource', function($resource) {
        return $resource('/plots', {}, {});
    }]);
angular.module('mean.graves').factory('Marker', ['$resource', function($resource) {
        return $resource('/markers', {}, {});
    }]);
angular.module('mean.graves').factory('Owner', ['$resource', function($resource) {
        return $resource('/owners', {}, {});
    }]);

angular.module('mean.graves')
        .directive('downloadbutton', ['$window', function($window) {
                return {
                    restrict: 'E',
                    terminal: true,
                    link: function(scope, element, attributes) {

                        var href = attributes.href;
                        var title = attributes.title;

                        // http://docs.angularjs.org/guide/directive#Attributes
                        attributes.$observe('href', function(value) {
                            var params = scope.$eval(value);
                            var p = params.path.slice(params.path.lastIndexOf('/') + 1);
                            href = 'puploads/' + p;

                            element.html('<a class="btn btn-success btn-xs" target="_self" href="' + href + '" title="Back to ' + title + '" download="' + title + '"><span class="glyphicon glyphicon-upload"></span> Download</a>');
                        });
                    }
                };
            }]);