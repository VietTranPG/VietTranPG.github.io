app.controller('takePhotoCtrl', function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $ionicModal, $window, $state, sharedUtils, $ionicHistory) {
    var vm = this;
    vm.photoConvert = "./img/imageMedication.png"
    vm.checkPhotoMedication = false;
    vm.medicationPhoto = function () {
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
                vm.photoConvert = "data:image/jpeg;base64," + image;
                vm.checkPhotoMedication = true;
                $scope.$apply();
                // uploadFile(base64);
            }, function (message) {
                sharedUtils.hideLoading();
            }, options);
        

    };
    vm.submitMedication = function(){
        $state.go("core.NoAccAddMedicationComplete", { medications: {file: vm.photoConvert}});
    }
});