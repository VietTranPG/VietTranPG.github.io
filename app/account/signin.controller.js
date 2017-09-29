app.controller('SigninCtrl', function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $window, $state, sharedUtils, $ionicHistory,Chat) {
    var vm = this;
    vm.signin = function (formValid) {
        if (formValid) {
            var url = SERVER_API + "patient/login";
            var data = {
                email: vm.email,
                password: vm.password,
            }
            $http.post(url, data, { withCredentials: true }).success(function (res) {
                if (res == null) {
                    sharedUtils.showToast('error', 'Internet Disconnected');
                } else {
                    if (res.Status == STATUS_ERROR) {
                        sharedUtils.showToast('error', res.Message);
                    } else {
                        $rootScope.histories = [];
                        $window.localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(res.Data));
                        $state.go('app.medications');
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        $rootScope.socket.connect();
                        Chat.init();
                    }
                }
            }).error(function (res) {
                sharedUtils.showToast('error', res);
            })

        } else {
            sharedUtils.showToast('error', 'Email and Password required');
        }
    };
})