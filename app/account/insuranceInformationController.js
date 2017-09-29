app.controller('InsuranceInformationCtrl', function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $ionicModal, $window, $state, sharedUtils, $ionicHistory, userInfor) {
    var vm = this;
    $rootScope.skipPayment = false;
    vm.insuranceInfo = userInfor.getData().insurance;
    vm.setInsuranceFunc = function () {
        userInfor.setInsurance(vm.insuranceInfo);
        console.log(userInfor.getData())
        $state.go('core.Payment');
    }
});