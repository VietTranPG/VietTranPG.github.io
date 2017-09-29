app.controller('SearchPharmacyCtrl', function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $ionicModal, $window, $state, sharedUtils, $ionicHistory) {
    var vm = this;
    var user = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_USER));
    vm.page = 1;
    vm.searchPharmacy = function (text, page) {
        var url = SERVER_API + 'patient/pharmacy/search';
        if (page == undefined) {
            var data = {
                search: text,
                page: 1
            }
        } else {
            var data = {
                search: text,
                page: page
            }
        }
        $http.post(url, data, { headers: { token: user.token } }, { withCredentials: true }).success(function (res) {
            if (res.Message == ACCESS_DENIED) {
                $state.go('core.Login');
            } else if (res.Status == STATUS_SUCCESS) {
                vm.listSearch = res.Data.data;
                vm.page = res.Data.page;
                vm.totalPage = res.Data.total_page;
                console.log(res.Data);
            }
        })
    }

    vm.clickSelectPage = function (page) {
        vm.page = page;
        vm.searchPharmacy(vm.text_search, vm.page);
    }
});