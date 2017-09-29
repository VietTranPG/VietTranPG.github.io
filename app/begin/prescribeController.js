app.controller("PrescribeCtrl", function($ionicPlatform, $stateParams, $rootScope, $scope, $http, $ionicModal, $window, $state, sharedUtils, $ionicHistory){
    var vm = this;
    if(JSON.parse(window.localStorage.getItem('LS_USER'))){
        vm.token = JSON.parse(window.localStorage.getItem('LS_USER')).token;
        vm.id = JSON.parse(window.localStorage.getItem('LS_USER')).id;
    };
    vm.submitPrescribe = function () {
        let data = {
            email: vm.email,
            phone: vm.phone,
            password: vm.password,
            token: vm.token,
            patient_id: vm.id
        }
        let url = SERVER_API + "patient/register-with-medication";
        $http.post(url, data).success(function (res){
            if(res.Status == STATUS_SUCCESS){
                $window.localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(res.Data));
                console.log(res);
                $state.go("core.NoAccInsurance");
            }else{
                sharedUtils.showToast('error', res.Message);
            }
        })
    }
})