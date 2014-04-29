'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Articles',
        'link': 'articles'
    }, {
        'title': 'Create New Article',
        'link': 'articles/create'
    }, {
        'title': 'Graves',
        'link': 'graves'
    }, {
        'title': 'Create New Grave',
        'link': 'graves/create'
    }, {
        'title': 'Cemeterys',
        'link': 'cemeterys'
    }, {
        'title': 'Create New Cemetery',
        'link': 'cemeterys/create'
    }];
    
    $scope.isCollapsed = false;
}]);