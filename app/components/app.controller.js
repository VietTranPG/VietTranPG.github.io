angular.module('starter.controllers', ['ionic']).controller('AppCtrl', AppCtrl);
function AppCtrl($scope, $rootScope, $http, $state, Chat, $location) {
    var vm = this;

    $rootScope.socket.on('disconnect', function () {
        console.log('dissconnnect')
        if($state.$current.includes.app){
            Chat.init();
        }

    });
    vm.login = function () {
        $state.go('core.Login');
    };
    vm.gotoChat = function () {
        $state.go('app.ChatBox');
    };

    vm.logout = function () {
        $rootScope.histories = [];
        localStorage.clear();
        // $rootScope.socket.disconnect();
        $rootScope.isLogout = true;
        $state.go('core.Begin');

    };
    $rootScope.socket.on('chat_receive', function (res) {
        if ($state.current.name != 'app.ChatBox') {
            res.Data.send_time = convertTime(res.Data.send_time);
            $rootScope.numberOfNewMes++;
        }
        $scope.$apply();
    });
    $rootScope.socket.on('connect', function () {
        console.log('connect');
    });

  
}
