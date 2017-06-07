'use strict';
var LocalOS = angular.module("LocalOS", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    'yaru22.angular-timeago'
])
.run(['$rootScope', '$state', '$stateParams', '$location', function ($rootScope, $state, $stateParams, $location) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        $rootScope.title = toState.title;
        event.targetScope.$watch('$viewContentLoaded', function () {
            angular.element('html, body, #content').animate({ scrollTop: 0 }, 200);
        });
    });
    
    
}])
/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
LocalOS.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);


//AngularJS v1.3.x workaround for old style controller declarition in HTML
LocalOS.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/* Setup global settings */
LocalOS.factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: './assets',
        globalPath: './assets/global',
        layoutPath: './assets/layouts/layout',
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
LocalOS.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function () {        
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
    toastr.options.positionClass = 'toast-top-full-width';
    toastr.options.extendedTimeOut = 0; //1000;
    toastr.options.timeOut = 2000;
    toastr.options.fadeOut = 1000;
    toastr.options.fadeIn = 1000;

    $rootScope.showToast = function (type, css, msg) {
        var t = { type: type, css: css, msg: msg };
        toastr.options.positionClass = t.css;
        toastr[t.type](t.msg);
    };
    $rootScope.connectChat = function () {
        if (localStorage.getItem('chatToken')) {
            var token = localStorage.getItem('chatToken');
            $rootScope.socket = io.connect('http://api.qa.localhealth.uat2.pgtest.co:3000/');
            $rootScope.socket.on('connect', function () {               
                $rootScope.socket.emit('authenticate', { token: token });               
            });
            $rootScope.socket.on('authenticated', function () {
                console.log('a')
            });
            $rootScope.socket.on('unauthorized', function (data) {
                console.log('Unauthorized, error msg: ' + data.message);
            });
            console.log(token);
        }

    };
    $rootScope.connectChat();
}]);

/* Setup Layout Part - Header */
LocalOS.controller('HeaderController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
LocalOS.controller('SidebarController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        // Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
LocalOS.controller('QuickSidebarController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        setTimeout(function () {
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Footer */
LocalOS.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        //  Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
LocalOS.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('core/login');

    $stateProvider

    //app
    .state('app', {
        abstract: true,
        url: '/app',
        controller: 'HeaderController',
        templateUrl: 'views/app.html',
    })
    //app core pages (errors, login,signup)
      .state('core', {
          abstract: true,
          url: '/core',
          template: '<div ui-view></div>'
      })
    //login
    .state('core.login', {
        url: '/login/:token',
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html',
        title: 'Login',
    })
    //campaigns 
    .state('chat', {
        url: '/chat',
        controller: 'ChatController',
        templateUrl: 'views/chat.html',
        title: 'chat',
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'LocalOS',
                    insertBefore: '#ng_load_plugins_before',
                    files: [
                       
                        '../js/controllers/ChatController.js',
                    ]
                });
            }]
        }
    })
    .state('core.error', {
        url: '/login',
        controller: 'ErrorPageController',
        templateUrl: 'views/error.html',
        title: 'chat',
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'LocalOS',
                    insertBefore: '#ng_load_plugins_before',
                    files: [
                        '../js/controllers/ErrorPageController.js',
                    ]
                });
            }]
        }
    })
}]);
LocalOS.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state;
    $rootScope.$settings = settings;
}]);