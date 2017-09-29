app.controller("PaymentCtrl", function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $window, $state, sharedUtils, $ionicHistory) {
    var vm = this;
    var user = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_USER));
    vm.today = new Date();
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
            vm.photoPaymentConvert = "data:image/jpeg;base64," + image;
            let photoPayment = {file: vm.photoPaymentConvert};
            callApi(photoPayment);
            // uploadFile(base64);
        }, function (message) {
            sharedUtils.hideLoading();
        }, options);


    };

    vm.submitPayment = function(){
        let data = {
            number: vm.card_number,
            cvc: vm.cvc,
            expire: vm.expiration
        }
        callApi(data);
    }

    function callApi(data) {
        var url = SERVER_API + "patient/credit-card/edit"
        $http.post(url, data, {headers: {token: user.token}}, { withCredentials: true }).success(function (res){
            if (res.Message == ACCESS_DENIED) {                
                $state.go('core.Login');
            } else if (res.Status == STATUS_SUCCESS) {
                $state.go("app.medications");
            }else{
                sharedUtils.showToast('error', res.Message);
            }
        })
    }
});