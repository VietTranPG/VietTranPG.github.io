app.controller('forgotPasswordCtrl', function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $window, $state, sharedUtils) {
    var vm = this;
    vm.disabledBtn = false;
    vm.forgotPassword = function () {
        var url = SERVER_API + 'patient/forgot';
        data = {
            email: vm.email,
            phone: vm.phone
        }
        $http.post(url, data).success(function (res) {
            if (res.Status == STATUS_SUCCESS) {
                vm.disabledBtn = true;
                sharedUtils.showToast('success', 'Verification code sent');
            } else {
                sharedUtils.showToast('error', res.Message);
            }
        });
    }

    vm.verifyPassword = function () {
        if (vm.password == vm.confirmPassword) {
            var url = SERVER_API + 'patient/forgot/verify';
            data = {
                email: vm.email,
                phone: vm.phone,
                verify_code: vm.verifyCode,
                password: vm.password,
                confirm_password: vm.confirmPassword
            }
            $http.post(url, data).success(function (res) {
                if (res.Status == STATUS_SUCCESS) {
                    sharedUtils.showToast('success', 'Change password successfully!');
                    $state.go('core.Login');
                } else {
                    sharedUtils.showToast('error', res.Message);
                }
            })
        } else {
            sharedUtils.showToast('error', 'Your passwords are not matching');
        }

    }
});