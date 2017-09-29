app.controller('AppPrescriptionCtrl', function ($ionicPlatform, $stateParams, $rootScope, $scope, $http, $ionicModal, $window, $state, sharedUtils, $ionicHistory) {
    var vm = this;
    $scope.user = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER));
    vm.medicationPhoto = function (sourceType) {
        if (sourceType == 1) {
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
                $scope.photoConvert = "data:image/jpeg;base64," + image;
                $scope.openModal($scope.photoConvert);
                // uploadFile(base64);
            }, function (message) {
                sharedUtils.hideLoading();
            }, options);
        } else {
            $state.go('app.transferPrescription');
        }

    };


    $ionicModal.fromTemplateUrl('app/medications/take-photo-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
}).controller("ModalController", function ($scope, $state, $http) {
    $scope.addComplete = function () {
        var url = SERVER_API + 'patient/prescription/insert';
        $http.post(url, {file: $scope.photoConvert}, {headers: {token: $scope.user.token}}, { withCredentials: true }).success(function (res){
            if(res.Status ==  STATUS_SUCCESS){
                $scope.closeModal();
                $state.go('app.addPrescriptionComplete');
            }else {
                alert(res.Message);
            }
        })
        
    }
});