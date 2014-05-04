'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'SEARCH | ',
        'link': 'search'
    }, {
        'title': 'MANAGE | ',
        'link': 'cemeteries'
    }, {
        'title': 'USERS | ',
        'link': 'users'
    }, {
        'title': 'REPORTS | ',
        'link': 'reports'
    }, {
        'title': 'SETTINGS',
        'link': 'settings'
    }];
    
    $scope.isCollapsed = false;
}]);