app.controller('profileEditCtrl',function($scope, $ionicPopup) {
    $scope.showPopup = function(){
      var myPopup = $ionicPopup.show({
        title: 'Enable Push Notifications',
        subTitle: 'Helper text',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: 'OK'
            /*type: 'button-positive'*/
          }
        ]
      });
    }
  });
