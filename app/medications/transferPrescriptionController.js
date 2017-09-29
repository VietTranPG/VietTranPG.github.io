app.controller("transferPrescriptionCtrl", function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $window, $state, sharedUtils, $ionicHistory) {
    let vm = this;
    var user = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_USER));
    vm.hasNewAddress = false;
    vm.transfer = function () {
        let data = {
            pharmacy: vm.pharmacy_name,
            address: vm.address,
            phone: vm.phone,
            medications: vm.medications_or_rxNumber,
            delivery: vm.delivery,
            has_new_address: vm.hasNewAddress,
            new_address: vm.newAddress
        }
        let url = SERVER_API + "patient/prescription/insert";
        $http.post(url, data, {headers: {token: user.token}}, {withCredentials: true}).success(function (res) {
            if(res.Status == STATUS_SUCCESS){
                console.log(res.Data);
                $state.go('app.addPrescriptionComplete');
            }else{
                sharedUtils.showToast('error', res.Message);
            }
        })
    }
    $scope.changeLocation = function (data) {
        console.log(data)
        if (typeof (data) == 'object') {
            vm.pharmacy_name = null;
            var placeId = data.place_id;
            getPlaceDetail(placeId);
        }

    }
    function getPlaceDetail(placeId) {
        var service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({
            placeId: placeId
        }, function (place, status) {
            console.log(place);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                vm.pharmacy_name = place.name;
                vm.address = place.formatted_address;
                vm.phone = place.international_phone_number;
                $scope.$apply();
            }
        });
    }

    vm.addNewAddress = function () {
        if (vm.hasNewAddress == true) {
            if (vm.delivery == undefined) {
                vm.delivery = "home";
                vm.homeIsSelected = true;
            } else if (vm.delivery == 'home') {
                vm.homeIsSelected = true;
            } else if (vm.delivery == 'work') {
                vm.homeIsSelected = false;
            }
        } else {
            vm.homeIsSelected = undefined;
            vm.newAddress = "";
        }
    }
    $scope.$watch('vm.delivery', function(oldVal, newVal){
        if(oldVal != newVal){
            vm.addNewAddress();
        }
    })
})