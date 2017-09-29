app.controller('AnonymousChatController', function ($scope, $rootScope, $http, $state, $ionicScrollDelegate, sharedUtils, $timeout, Chat) {
  var vm = this;
  var user = JSON.parse(window.localStorage.getItem('LS_USER'));
  var roomId = user.room_id
  var token;
  var limit_message = 10;
  var page = 1;
  $scope.totalPage = 0;
  $rootScope.socket.connect();
  Chat.init();
  var currentDate = new Date();
  $timeout(function () {
    $ionicScrollDelegate.scrollBottom(true);
  }, 500);
  var timezone = (currentDate.getTimezoneOffset() / -60);
  function convertTime(time) {
    return moment(time).add(timezone, 'hours').toDate();
  };
  if (localStorage.getItem(LOCALSTORAGE_USER)) {
    token = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER)).token;
  } else {
    $state.go('core.Login');
  }
  vm.sendMessage = function (mes) {
    if (mes) {
      Chat.sendMessage(mes);
      vm.inputChat = null;
    }
  };
  vm.showCam = function (type) {
    console.log(type);
    sharedUtils.showLoading();
    var options = {
      quality: 100,
      targetWidth: 400,
      targetHeight: 400,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: type, // 0:Photo Library, 1=Camera
      encodingType: 0,
      cameraDirection: 0
    }
    function onSuccess(DATA_URL) {
      sharedUtils.hideLoading();
      var base64 = "data:image/jpeg;base64," + DATA_URL;
      uploadFile(base64);
    }
    function onFail(message) {
      sharedUtils.hideLoading();
    }
    navigator.camera.getPicture(onSuccess, onFail, options);
  };
  function uploadFile(base64) {
    $http.post(SERVER_API + 'patient/upload/file', { file: base64 }, { headers: { token: token } }, { withCredentials: true })
      .success(function (response) {
        if (response.Message == ACCESS_DENIED) {
          $state.go('core.Login');
        } else if (response.Status == STATUS_SUCCESS) {
           Chat.sendMessageImage(response.Data.image);
        } else {
          sharedUtils.showToast('error', 'toast-bottom-right', INTERNET_DISCONNECTED);
        }
      }).error(function (e) {
        sharedUtils.showToast('error', 'toast-bottom-right', INTERNET_DISCONNECTED);
      });
  };
});
