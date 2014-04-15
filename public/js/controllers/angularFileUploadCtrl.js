'use strict';

angular.module('mean', ['angularFileUpload']);

var TestController = /*['$scope', '$http', '$timeout', '$upload', function($scope, $http, $timeout, $upload) {

 angular.module('mean').controller('TestController',*/ ['$scope', '$rootScope', 'Global', '$fileUploader', function($scope, $rootScope, Global, $fileUploader) {

        $scope.global = Global;
        $scope.global.documents = [];
        $scope.global.images = [];

        // create a uploader with options
        var uploader = $scope.uploader = $fileUploader.create({
            scope: $scope, // to automatically update the html. Default: $rootScope
            url: '/fileupload/', //'upload.php',
            removeAfterUpload: true,
            formData: [
                {key: 'value'}
            ],
            filters: [
                function(item) {                    // first user filter
                    console.info('filter1');
                    return true;
                }
            ]
        });

        // ADDING FILTERS

        uploader.filters.push(function(item) { // second user filter
            console.info('filter2');
            return true;
        });

        var is_image = function(item /*{File|HTMLInputElement}*/) {
            var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
            type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
            var ret = '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            return ret;
        };

        // REGISTER HANDLERS

        uploader.bind('afteraddingfile', function(event, item) {
            console.info('After adding a file', item);
        });

        uploader.bind('whenaddingfilefailed', function(event, item) {
            console.info('When adding a file failed', item);
        });

        uploader.bind('afteraddingall', function(event, items) {
            console.info('After adding all files', items);
        });

        uploader.bind('beforeupload', function(event, item) {
            console.info('Before upload', item);
        });

        uploader.bind('progress', function(event, item, progress) {
            console.info('Progress: ' + progress, item);
        });

        uploader.bind('success', function(event, xhr, item, response) {
            console.info('11Success', xhr, item, response);
            if (item.isSuccess) {
                if (is_image(response)) {
                    $rootScope.$broadcast('images:complete', {
                        path: response,
                        file: item.file
                    });
                } else {

                    $rootScope.$broadcast('files:complete', {
                        path: response,
                        file: item.file
                    });
                }
            }
        });

        uploader.bind('cancel', function(event, xhr, item) {
            console.info('Cancel', xhr, item);
        });

        uploader.bind('error', function(event, xhr, item, response) {
            console.info('Error', xhr, item, response);
        });

        uploader.bind('complete', function(event, xhr, item, response) {
            console.info('Complete', xhr, item, response);
        });

        uploader.bind('progressall', function(event, progress) {
            console.info('Total progress: ' + progress);
        });

        uploader.bind('completeall', function(event, items) {
            console.info('Complete all', items);

        });
    }];
//);

