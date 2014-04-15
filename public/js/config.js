'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider
                .state('all articles', {
                    url: '/articles',
                    templateUrl: 'views/articles/list.html'
                })
                .state('create article', {
                    url: '/articles/create',
                    templateUrl: 'views/articles/create.html'
                })
                .state('edit article', {
                    url: '/articles/:articleId/edit',
                    templateUrl: 'views/articles/edit.html'
                })
                .state('article by id', {
                    url: '/articles/:articleId',
                    templateUrl: 'views/articles/view.html'
                })

                .state('all graves', {
                    url: '/graves',
                    templateUrl: 'views/graves/list.html'
                })
                .state('create grave', {
                    url: '/graves/create',
                    templateUrl: 'views/graves/create.html'
                })
                .state('edit grave', {
                    url: '/graves/:graveId/edit',
                    templateUrl: 'views/graves/create.html'
                })
                .state('grave by id', {
                    url: '/graves/:graveId',
                    templateUrl: 'views/graves/view.html'
                })


                .state('all cemeterys', {
                    url: '/cemeterys',
                    templateUrl: 'views/cemeterys/list.html'
                })
                .state('create cemetery', {
                    url: '/cemeterys/create',
                    templateUrl: 'views/cemeterys/create.html'
                })
                .state('edit cemetery', {
                    url: '/cemeterys/:cemeteryId/edit',
                    templateUrl: 'views/cemeterys/edit.html'
                })
                .state('cemetery by id', {
                    url: '/cemeterys/:cemeteryId',
                    templateUrl: 'views/cemeterys/view.html'
                })

                .state('all sections', {
                    url: '/sections',
                    templateUrl: 'views/sections/list.html'
                })
                .state('create sections', {
                    url: '/sections/create',
                    templateUrl: 'views/sections/create.html'
                })
                .state('edit sections', {
                    url: '/sections/:sectionId/edit',
                    templateUrl: 'views/sections/create.html'
                })
                .state('sections by id', {
                    url: '/sections/:sectionId',
                    templateUrl: 'views/sections/view.html'
                })

                .state('all plots', {
                    url: '/plots',
                    templateUrl: 'views/plots/list.html'
                })
                .state('create plots', {
                    url: '/plots/create',
                    templateUrl: 'views/plots/create.html'
                })
                .state('edit plots', {
                    url: '/plots/:plotId/edit',
                    templateUrl: 'views/plots/create.html'
                })
                .state('plots by id', {
                    url: '/plots/:plotId',
                    templateUrl: 'views/plots/view.html'
                })

                .state('all markers', {
                    url: '/markers',
                    templateUrl: 'views/markers/list.html'
                })
                .state('create markers', {
                    url: '/markers/create',
                    templateUrl: 'views/markers/create.html'
                })
                .state('edit markers', {
                    url: '/markers/:markerId/edit',
                    templateUrl: 'views/markers/create.html'
                })
                .state('markers by id', {
                    url: '/markers/:markerId',
                    templateUrl: 'views/markers/view.html'
                })


                .state('edit user', {
                    url: '/users/:userId/edit',
                    templateUrl: 'views/users/create.html'
                })
                .state('users by id', {
                    url: '/users/:userId',
                    templateUrl: 'views/users/view.html'
                })
                .state('user by id', {
                    url: '/users/me',
                    templateUrl: 'views/users/create.html'
                })

                .state('all owners', {
                    url: '/owners',
                    templateUrl: 'views/owners/list.html'
                })
                .state('create owners', {
                    url: '/owners/create',
                    templateUrl: 'views/owners/create.html'
                })
                .state('edit owners', {
                    url: '/owners/:ownerId/edit',
                    templateUrl: 'views/owners/create.html'
                })
                .state('owners by id', {
                    url: '/owners/:ownerId',
                    templateUrl: 'views/owners/view.html'
                })


                .state('home', {
                    url: '/',
                    templateUrl: 'views/index.html'
                });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
