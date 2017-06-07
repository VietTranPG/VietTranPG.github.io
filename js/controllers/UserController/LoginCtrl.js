angular.module('LocalOS').controller('LoginCtrl', function ($rootScope, $scope, $http, $timeout, $state, $stateParams) {
    var token = $stateParams.token;
    localStorage.clear();
    try{
        $scope.phone_number = atob($stateParams.token);
    }catch(err){
        $state.go('core.login')
    }
    localStorage.setItem('phoneNumber', $scope.phone_number);;
    $rootScope.connectChat();
    $scope.getverifyCode = function () {
        $http.post(SERVER_API + "patient/login/phone", { phone_number: $scope.phone_number }, { withCredentials: true })
           .success(function (response) {
               if (response.Status == STATUS_ERROR) {                 
                   $rootScope.showToast('error', 'toast-top-right', response.Message);
               } else if (response.Status == STATUS_SUCCESS) {
                   $rootScope.showToast('success', 'toast-top-right','Get verify code success, check your device');
                   $scope.showVerify = true;
               }
               $scope.disableBtn = false;
           }).error(function (e) {
               $rootScope.showToast('error', 'toast-top-right', e);
               $scope.disableBtn = false;
           });
    }
    $scope.verify = function () {
        $http.post(SERVER_API + "patient/verify/phone",{ phone_number: $scope.phone_number, verify_code: $scope.verify_code },
                { withCredentials: true })
            .success(function (response) {                 
                if (response.Status == STATUS_ERROR) {
                    $rootScope.showToast('error', 'toast-top-right', response.Message);
                } else if (response.Status == STATUS_SUCCESS) {
                    localStorage.setItem('chatToken', response.Data.chat_token)
                    $rootScope.connectChat();
                    $state.go("chat");
                 }
                $scope.disableBtn = false;
            }).error(function(e) {
                $rootScope.showToast('error', 'toast-top-right', e);
                $scope.disableBtn = false;
            });
    }

    $scope.resend = function () {
        $http.post(SERVER_API + "patient/verify/resend", { phone_number: $scope.phone_number}, { withCredentials: true })
            .success(function (response) {
                if (response.Status == STATUS_ERROR) {
                    $rootScope.showToast('error', 'toast-top-right', response.Message);
                } else if (response.Status == STATUS_SUCCESS) {
                    $rootScope.showToast('success', 'toast-top-right', 'Get verify code success, check your device');
                }
                $scope.disableBtn = false;
            }).error(function (e) {
                $rootScope.showToast('error', 'toast-top-right', e);
                $scope.disableBtn = false;
            });
    }
});