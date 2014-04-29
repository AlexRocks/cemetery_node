'use strict';

//Articles service used for owners REST endpoint
angular.module('mean.owners').factory('Owners', ['$resource', function($resource) {
        return $resource('owners/:ownerId', {
            ownerId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);


angular.module('mean.owners')
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