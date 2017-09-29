angular.module('utilities.services', []).factory('sharedUtils', ['$rootScope', '$ionicLoading', '$ionicPopup', '$state','toaster', function ($rootScope, $ionicLoading, $ionicPopup, $state,toaster) {
    return {
        showLoadingMess: function (msg) {
            $ionicLoading.show({
                template: msg, // The text to display in the loading indicator
                animation: 'fade-in', // The animation to use
                showBackdrop: false, // Will a dark overlay or backdrop cover the entire view
                maxWidth: 200, // The maximum width of the loading indicator. Text will be wrapped if longer than maxWidth
                showDelay: 0, // The delay in showing the indicator
                duration: 1000,
            });
        },
        showAlert: function (title, message) {
            var alertPopup = $ionicPopup.show({
                title: title,
                template: message,
                cssClass: 'ffPopup ffAlert',
                buttons: [{
                    text: '<i class="icon ion-ios-close-empty"></i>',
                    type: 'popclose',
                    onTap: function (e) {
                        return true;
                    }
                }]
            });
            return alertPopup;
        },
        showToast: function (type, title, text) {
            toaster.pop(type, title, text);
        },
        showLoading: function () {
            $ionicLoading.show({
                animation: 'fade-in', // The animation to use
                showBackdrop: false, // Will a dark overlay or backdrop cover the entire view
                maxWidth: 200, // The maximum width of the loading indicator. Text will be wrapped if longer than maxWidth
                showDelay: 0, // The delay in showing the indicator
            });
        },
        hideLoading: function () {
            $ionicLoading.hide();
        },
    }

}
]);