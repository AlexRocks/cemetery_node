'use strict';

/**/
angular.module('mean.markers')
        // Angular File Upload module does not include this directive
        // Only for example
        .directive('ngThumb', ['$window', function($window) {
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

                        var params = scope.$eval(attributes.ngThumb);


                        console.info(params.file);

                        /**/
                        if (!helper.isFile(params.file))
                            return;

                        console.log("f2:" + helper.isImage(params.file));


                        if (!helper.isImage(params.file))
                            return;
                        /**/
                        console.log("fuck");


                        var canvas = element.find('canvas');
                        var reader = new FileReader();

                        console.log("reader");


                        reader.onload = onLoadFile;


                        console.log("onloa");


                        reader.readAsDataURL(params.file);

                        function onLoadFile(event) {

                            console.log("onLoadFile");


                            var img = new Image();
                            img.onload = onLoadImage;
                            img.src = event.target.result;
                        }

                        function onLoadImage() {

                            console.log("onLoadImage");


                            var width = params.width || this.width / this.height * params.height;
                            var height = params.height || this.height / this.width * params.width;
                            canvas.attr({width: width, height: height});
                            canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                        }
                    }
                };
            }]);
/**/

'use strict';

/**/

/**/