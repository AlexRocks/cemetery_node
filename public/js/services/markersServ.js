'use strict';

//Articles service used for acmCemetery REST endpoint
angular.module('mean.markers').factory('Markers', ['$resource', function($resource) {
        return $resource('markers/:markerId', {
            markerId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);


angular.module('mean.markers').factory('Cemetery', ['$resource', function($resource) {
        return $resource('/cemeterys', {}, {});
    }]);
angular.module('mean.markers').factory('Section', ['$resource', function($resource) {
        return $resource('/sections', {}, {});
    }]);
angular.module('mean.markers').factory('Plot', ['$resource', function($resource) {
        return $resource('/plots', {}, {});
    }]);
angular.module('mean.markers')
        // Angular File Upload module does not include this directive
        // Only for example
        .directive('ngThumbm', ['$window', function($window) {
                var helper = {
                    support: !!($window.FileReader && $window.CanvasRenderingContext2D),
                    isFile: function(item) {
                        return angular.isObject(item) && item instanceof $window.File;
                    },
                    isImage: function(file) {
                        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                };
                return {
                    restrict: 'A',
                    template: '<canvas/>',
                    link: function(scope, element, attributes) {
                        if (!helper.support)
                            return;
                        var params = scope.$eval(attributes.ngThumbm);
                        var canvas = element.find('canvas');
                        var p = params.file.path.slice(params.file.path.lastIndexOf('/') + 1);
                        var img = new Image();
                        img.onload = onLoadImage;
                        img.src = 'puploads/' + p;
                        function onLoadImage() {
                            var width = params.width || this.width / this.height * params.height;
                            var height = params.height || this.height / this.width * params.width;
                            canvas.attr({width: width, height: height});
                            canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                        }
                    }
                };
            }]);

angular.module('mean.markers')
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