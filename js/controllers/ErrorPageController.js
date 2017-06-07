angular.module('LocalOS').controller('ErrorPageController', function ($rootScope, $scope, $http, $timeout, $state,$filter,timeAgo) {
   $scope.currentDate=$filter('date')(new Date(), 'yyyy/M/d HH:mm:ss');
   $scope.timezone = ( new Date( $scope.currentDate).getTimezoneOffset()/ -60);
   $scope.changeTime =  $filter('date')(new Date($scope.currentDate ), 'yyyy/M/d HH:mm:ss','UTC');
   $scope.changeTime2 =  $filter('date')(new Date($scope.currentDate + " UTC" ), 'yyyy/M/d HH:mm:ss',$scope.timezone);
});