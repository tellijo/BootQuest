'use strict';

angular.module('bootquestApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        title: 'BootQuest - Admin'
      });
  });