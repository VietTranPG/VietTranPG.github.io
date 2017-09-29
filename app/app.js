// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var SOCKET_API = 'http://socket.localhealth.uat.pgtest.co/';

var app = angular.module('starter', ['ionic', 'starter.controllers', 'ngResource', 'ngIOS9UIWebViewPatch', 'ui.bootstrap', 'ngCordova', 'ngTouch', 'utilities.services', 'toaster', 'btford.socket-io', 'yaru22.angular-timeago', 'ion-datetime-picker']);


app.run(function ($ionicPlatform, $rootScope, $ionicLoading, $http, $ionicScrollDelegate, socketFactory,Chat) {
  $rootScope.$on('loading:show', showLoading);
  $rootScope.$on('loading:hide', hideLoading);

  if (window.localStorage.getItem(LOCALSTORAGE_USER)) {
    $rootScope.user = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_USER));
  }
  $rootScope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState, fromParams) {
      if ($rootScope.user) {
        $http.defaults.headers.common['token'] = $rootScope.user.token;
      }
      setTimeout(function () {
        $rootScope.fromState = fromState;
        var state = fromState.name.substring(0, 3);
        if ((state == "app") && (toState.name == "core.Login")) {
          location.reload();
        }
      }, 300);
    })
  $rootScope.histories = [];
  $rootScope.numberOfNewMes = 0;
  // $rootScope.connectSocket = false;
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleLightContent();
      StatusBar.styleDefault();
    }
  });

  function showLoading() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
  }

  function hideLoading() {
    $ionicLoading.hide();
  }
  $rootScope.isLogout = false;
  document.addEventListener("resume", function () {
    console.log('onAppResume');
    $rootScope.socket.connect();
    Chat.init();
  }, false);

});

app.service('chatSocket', function (socketFactory, $rootScope) {
});




