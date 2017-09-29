angular.module(['ionic']).controller('HeaderCoreCtrl',HeaderCoreCtrl);
function HeaderCoreCtrl($scope, $rootScope, $state,$http,Chat) {
    var vm = this;
    vm.skipPayment = function(){
        $rootScope.skipPayment = false;
    }
    var currentDate = new Date();
    var timezone = (currentDate.getTimezoneOffset() / -60);
    function convertTime(time) {
      return moment(time).add(timezone, 'hours').toDate();
    };
    vm.goToPage = function () {
        $state.go('core.BeginEnd');
      };
      vm.anonymousChat = function(){
        if (localStorage.getItem(LOCALSTORAGE_USER)) {
            var user = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER));
            var token = user.token;
            var roomId = user.room_id;
            var url = SERVER_API + 'patient/conversation/' + roomId + '?page=0' + '&limit=100';
            $http.get(url, { headers: { token: token } })
                .success(function (response) {
                    $rootScope.histories = response.Data.data;                   
                    for (i = 0; i < $rootScope.histories.length; i++) {
                        $rootScope.histories[i].send_time = convertTime($rootScope.histories[i].send_time);
                    }
                    Chat.init();
                    $state.go('core.AnonymousChat')
                }).error(function (e) {
                });
        } else {
            var url = SERVER_API + "patient/anonymous/login";
            $http.post(url).success(function (res) {
                console.log(res)
                res.Data.isAnonymous = true;
                localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(res.Data));
                $rootScope.histories = [];
                Chat.init();
                $state.go('core.AnonymousChat')
            }).error(function (error) {
                console.log(error)
            })
        }
      }
}