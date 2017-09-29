app.controller('InsuranceCtrl', function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $ionicModal, $window, $state, sharedUtils, $ionicHistory, userInfor) {
    var vm = this;
    $rootScope.skipPayment = false;
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
            $scope.photoInsuranceConvert = "data:image/jpeg;base64," + image;
            userInfor.setInsurance({file: $scope.photoInsuranceConvert});
            $state.go('core.Payment');
            // $scope.openModal($scope.photoConvert);
            // uploadFile(base64);
        }, function (message) {
            sharedUtils.hideLoading();
        }, options);
    }
});