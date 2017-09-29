app.controller('createdAccountCtrl', function($ionicPlatform, $stateParams, $rootScope, $scope, $http, $window, $state){
    var vm = this;
    vm.name = $stateParams.name;
    console.log(vm.name);
})