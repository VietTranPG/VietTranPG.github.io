
angular.module('LocalOS').controller('HeaderController', function ($rootScope, $scope, $http, $timeout, $state, logoutService) {
    $scope.logout = function (isButton) {        
        logoutService.logout(isButton);
    }
});