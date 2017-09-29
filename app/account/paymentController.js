app.controller('PaymentCtrl', function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $ionicModal, $window, $state, sharedUtils, $ionicHistory, userInfor) {
    var vm = this;
    console.log(userInfor.getData());
    if(userInfor.getData().credit_card.number){
        vm.credit_card = userInfor.getData().credit_card.number;
    }
    $rootScope.skipPayment = true;
    vm.takePhoto = function (){
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
            $scope.photoPaymentConvert = "data:image/jpeg;base64," + image;
            userInfor.setPayment({file: $scope.photoPaymentConvert});
            $rootScope.skipPayment = false;
            $state.go('core.allergies');
            // $scope.openModal($scope.photoConvert);
            // uploadFile(base64);
        }, function (message) {
            sharedUtils.hideLoading();
        }, options);
    }

    vm.paymentInfo = function (){
        userInfor.setPayment({number: vm.credit_card});
        $rootScope.skipPayment = false;
        $state.go('core.allergies');
    }
});