app.controller('menuCtrl', function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $window, $state) {
    var vm = this;
    console.log('a')
    vm.logout = function () {
        var url = SERVER_API + 'patient/logout'
        $http.post(url, { token: JSON.parse(localStorage.getItem(LOCALSTORAGE_USER)).token }).success(function (res) {
            if(res.Status == STATUS_SUCCESS){
                localStorage.removeItem(LOCALSTORAGE_USER);
                $state.go('app.Login');
            }
        })
    }
});