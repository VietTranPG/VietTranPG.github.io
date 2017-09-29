app.controller('AllergiesCtrl', function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $ionicModal, $window, $state, sharedUtils, $ionicHistory, userInfor) {
    var vm = this;
    vm.registration = function (){
        userInfor.setAllergies(vm.allergies);
        console.log(userInfor.getData())
        var data = userInfor.getData();
        var url = SERVER_API + "patient/register";
        $http.post(url, data, { withCredentials: true }).success(function (res){
            if (res.Status == STATUS_ERROR) {
                sharedUtils.showToast('error', res.Message);
            }else if(res.Message == ACCESS_DENIED){
                $state.go('core.Login');
            } else if(res.Status == STATUS_SUCCESS){
                console.log(res);
                $window.localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(res.Data))
                userInfor.defaultObj();
                $state.go('app.createdAccount', { name: data.first_name + " " +  data.last_name});
            }else{
                sharedUtils.showToast('error', res);
            }
        })
    }
});