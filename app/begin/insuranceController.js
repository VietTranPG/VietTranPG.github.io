app.controller("InsuranceCtrl", function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $window, $state, sharedUtils, $ionicHistory) {
    var vm = this;
    var user = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_USER));
    vm.takePhoto = function () {
        var options = {
            quality: 50,
            targetWidth: 400,
            targetHeight: 400,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1, // 0:Photo Library, 1=Camera
            encodingType: 0,
            cameraDirection: 0
        }

        navigator.camera.getPicture(function (image) {
            vm.photoInsuranceConvert = "data:image/jpeg;base64," + image;
            let photoInsurance = {file: vm.photoInsuranceConvert};
            callApi(photoInsurance);
            // uploadFile(base64);
        }, function (message) {
            sharedUtils.hideLoading();
        }, options);


    };

    vm.submitInsurance = function(){
        let data = {
            insurance_number: vm.insurance_number,
            bin: vm.bin,
            pcn: vm.pcn
        }
        callApi(data);
    }
    
    function callApi(data) {
        var url = SERVER_API + "patient/insurance/edit"
        $http.post(url, data, {headers: {token: user.token}}, { withCredentials: true }).success(function (res){
            if (res.Message == ACCESS_DENIED) {                
                $state.go('core.Login');
            } else if (res.Status == STATUS_SUCCESS) {
                $state.go("core.NoAccPayment");
            }else{
                sharedUtils.showToast('error', res.Message);
            }
        })
    }
})