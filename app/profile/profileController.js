app.controller('ProfileCtrl', function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $window, $state, sharedUtils, $ionicHistory) {
    var vm = this;
    var user = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER));
    console.log(user);
    vm.name = user.first_name + " " + user.last_name;
    vm.personal = user.email;

    if((user.address1 && user.address2) == null){
        vm.addresses = "You have no address";
    }else if((user.address1 || user.address2) == null){
        vm.addresses = "You have 1 address";
    }else {
        vm.addresses = "You have 2 address";
    }

    if(user.insurance == null){
        vm.insurance = "No insurance yet"
    }else{
        vm.insurance = user.insurance.insurance_id;
    }

    if(user.credit_card == null){
        vm.creditCard = "No insurance yet"
    }else{
        vm.creditCard = user.credit_card.number;
    }
    
});