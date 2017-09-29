app.controller('SignupCtrl', function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $ionicHistory, $window, $state, sharedUtils, userInfor) {
    var vm = this;
    var history = null;
    if (($rootScope.fromState.name == "core.Login") || ($rootScope.fromState.name == "core.Begin")) {
        userInfor.defaultObj();
    }
    vm.today = new Date();
    vm.info = {};
    vm.info = userInfor.getData();
    vm.signup = function (formValid) {
        if (vm.password == vm.confirm_password) {
            var url = SERVER_API + 'patient/register/person/validate';
            userInfor.setData(vm.info);

            $http.post(url, userInfor.getData(), { withCredentials: true }).success(function (res) {
                if (res.Status == STATUS_SUCCESS) {
                    $state.go('core.Insurance');
                } else {
                    sharedUtils.showToast('error', res.Message);
                }
            })
        } else {
            sharedUtils.showToast('error', 'Your passwords are not matching');
        }
    }
    $scope.test = function(){
        $state.go('app.createdAccount');
    }
})