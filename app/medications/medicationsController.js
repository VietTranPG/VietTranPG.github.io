app.controller('MedicationsCtrl', function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $ionicModal, $window, $state, sharedUtils, $ionicHistory) {
    var vm = this;
    var user = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_USER));
    vm.listMedications = function () {
        var url = SERVER_API + "patient/prescription";
        $http.get(url, { headers: { token: user.token } }, { withCredentials: true }).success(function (res) {
            console.log(res);
            if (res.Message == ACCESS_DENIED) {                
                $state.go('core/begin');
            } else if (res.Status == STATUS_SUCCESS) {
                vm.medications = res.Data.reverse();
                console.log(res.Data)
            }
        })
    }
    vm.listMedications();
});
