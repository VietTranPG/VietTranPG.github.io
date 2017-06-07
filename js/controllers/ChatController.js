angular.module('LocalOS').controller('ChatController', function ($rootScope, $scope, $http, $timeout, $state, logoutService, timeAgo, $filter) {
    var ringtones = new Audio('/../../assets/chat_notification.mp3');
    var currentDate = new Date();
    var timezone = (currentDate.getTimezoneOffset() / -60);
    $scope.phoneNumber = localStorage.getItem('phoneNumber');
    var room_id;
    $scope.messages = [];
    $rootScope.socket.on('patient_room', function (res) {
        room_id = res.Data.room_id
        console.log(room_id);
    });
    $scope.sendMessage = function (mes) {
        if (mes) {
            $rootScope.socket.emit('chat_send', { 'room_id': room_id, 'message': mes, 'phone_number': null });
        }
    };
    $rootScope.socket.on('chat_send', function (res) {
        $scope.$apply(function () {
            res.Data.send_time = $filter('date')(new Date(res.Data.send_time + " UTC"), 'yyyy/M/d HH:mm:ss', timezone);
            $scope.messages.push(res.Data);
            ringtones.play();
            $scope.inputChat = null;
        });
        scrollBottom();
    });
    $scope.$on('$viewContentLoaded', function () {
        $rootScope.socket.on('chat_receive', function (res) {
            res.Data.send_time = $filter('date')(new Date(res.Data.send_time + " UTC"), 'yyyy/M/d HH:mm:ss', timezone);
            $scope.$apply(function() {
                $scope.messages.push(res.Data);
                ringtones.play();
            });
            scrollBottom();
        });

    });
    function scrollBottom() {
        var height = $(document).innerHeight();
        var heightWindow = ($(window).height() + 70);
        if (height > heightWindow) {
            var scrollAmount = height;
            jQuery("html, body").animate({
                    scrollTop: scrollAmount
                },
                100);
        }

    };
});