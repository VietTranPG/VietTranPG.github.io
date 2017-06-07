angular.module('LocalOS').controller('ErrorPageController', function ($rootScope, $scope, $http, $timeout, $state,$filter) {
   $scope.currentDate = new Date();
   $scope.timezone = ( $scope.currentDate.getTimezoneOffset() / -60);
   $scope.changeTime =  $filter('date')(new Date($scope.currentDate ), 'yyyy/M/d HH:mm:ss','UTC');
});