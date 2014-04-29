'use strict';

angular.module('mean.system').controller('ActionsController', ['$scope', 'Global', function($scope, Global) {
        $scope.global = Global;

        $scope.actions = [{
                'title': 'Cemeterys',
                'link': 'cemeterys'
            }, {
                'title': 'Create New Cemetery',
                'link': 'cemeterys/create'
            }, {
                'title': 'Section',
                'link': 'sections'
            }, {
                'title': 'Create New Section',
                'link': 'sections/create'
            }, {
                'title': 'Plots',
                'link': 'plots'
            }, {
                'title': 'Create New Plot',
                'link': 'plots/create'
            }, {
                'title': 'Markers',
                'link': 'markers'
            }, {
                'title': 'Create New Marker',
                'link': 'markers/create'
            }, {
                'title': 'Graves',
                'link': 'graves'
            }, {
                'title': 'Create New Grave',
                'link': 'graves/create'
            }, {
                'title': 'Owners',
                'link': 'owners'
            }, {
                'title': 'Create New Owner',
                'link': 'owners/create'
            }, {
                'title': 'Users',
                'link': 'users'
            }];
    }]);