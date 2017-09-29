//var URL_API = 'http://api.crazical.pgtest.co:8081/';
//var URL_API = 'http://web.crazi/';
//var URL_API = 'http://api.crazical.uat2.pgtest.co:8080/';
//var URL_API = 'http://192.168.1.44/';
//var URL_API = 'http://192.168.1.33:81/';
var FACEBOOK_APP_ID = '';
var GOOGLE_API_CLIENT_ID = '';


app.config(routeConfig);
app.config(httpInterceptorConfig);
app.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.views.swipeBackEnabled(false);
});
function routeConfig($stateProvider, $urlRouterProvider, $ionicConfigProvider, $locationProvider) {
  $ionicConfigProvider.views.maxCache(0);
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/components/menu.html',
    title: 'LocalOS'
  })
    .state('core', {
      url: '/core',
      abstract: true,
      templateUrl: 'app/components/menu-core.html',
      title: 'LocalOS'
    })
    .state('core.Begin', {
      url: '/begin',
      views: {
        'menuContent': {
          templateUrl: 'app/begin/begin.html'
        }
      }
    })

    .state('core.BeginEnd', {
      url: '/begin-end',
      views: {
        'menuContent': {
          templateUrl: 'app/begin/begin-end.html'
        }
      }
    })

    .state('core.NoAccAddMedication', {
      url: '/add-medication-no',
      views: {
        'menuContent': {
          templateUrl: 'app/begin/medication.html'
        }
      }
    })

    .state('core.NoAccTakePhoto', {
      url: '/take-photo-no',
      views: {
        'menuContent': {
          templateUrl: 'app/begin/take-photo.html'
        }
      }
    })

    .state('core.NoAccAddMedicationComplete', {
      url: '/add-medication-complete-no',
      views: {
        'menuContent': {
          templateUrl: 'app/begin/add-prescription-complete.html'
        }
      },
      params: { medications: null }
    })

    .state('core.NoAccInsurance', {
      url: '/insurance-no',
      views: {
        'menuContent': {
          templateUrl: 'app/begin/insurance.html'
        }
      }
    })

    .state('core.NoAccPayment', {
      url: '/payment-no',
      views: {
        'menuContent': {
          templateUrl: 'app/begin/payment.html'
        }
      }
    })

    .state('core.NoAccTransferPrescription', {
      url: '/transfer-prescription-no',
      views: {
        'menuContent': {
          templateUrl: 'app/begin/transfer-prescription.html'
        }
      }
    })

    .state('core.NoAccPrescribe', {
      url: '/prescribe-no',
      views: {
        'menuContent': {
          templateUrl: 'app/begin/prescribe.html'
        }
      }
    })


    .state('core.Login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'app/account/signin.html'
        }
      }
    })

    .state('app.createdAccount', {
      url: '/created-account',
      views: {
        'menuContent': {
          templateUrl: 'app/account/created-account.html'
        }
      },
      params: { name: null }
    })

    .state('core.SignUp', {
      url: '/signup',
      views: {
        'menuContent': {
          templateUrl: 'app/account/signup.html'
        }
      }
    })
    .state('core.AnonymousChat', {
      url: '/anonymousChat',
      views: {
        'menuContent': {
          templateUrl: 'app/chat/anonymousChat.html'
        }
      }
    })
    .state('core.Insurance', {
      url: '/insurance',
      views: {
        'menuContent': {
          templateUrl: 'app/account/insurance.html'
        }
      }
    })
    .state('core.InsuranceInformation', {
      url: '/insurance-information',
      views: {
        'menuContent': {
          templateUrl: 'app/account/insurance-information.html'
        }
      }
    })

    .state('core.Payment', {
      url: '/payment',
      views: {
        'menuContent': {
          templateUrl: 'app/account/payment.html'
        }
      }
    })

    .state('core.allergies', {
      url: '/allergies',
      views: {
        'menuContent': {
          templateUrl: 'app/account/allergies.html'
        }
      }
    })

    .state('core.forgotPassword', {
      url: '/for-password',
      views: {
        'menuContent': {
          templateUrl: 'app/account/forgot_password.html'
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'app/profile/profile.html'
        }
      }
    })

    .state('app.medications', {
      url: '/medications',
      views: {
        'menuContent': {
          templateUrl: 'app/medications/medications.html'
        }
      }
    })
    .state('app.addPrescription', {
      url: '/add-prescription',
      views: {
        'menuContent': {
          templateUrl: 'app/medications/add-prescription.html'
        }
      }
    })
    
    .state('app.takePhotoMedication', {
      url: '/take-photo-medication',
      views: {
        'menuContent': {
          templateUrl: 'app/medications/take-photo-medication.html'
        }
      }
    })

    .state('app.searchPharmacy', {
      url: '/search-pharmacy',
      views: {
        'menuContent': {
          templateUrl: 'app/medications/search-pharmacy.html'
        }
      }
    })
    .state('app.addPrescriptionComplete', {
      url: '/add-prescription-complete',
      views: {
        'menuContent': {
          templateUrl: 'app/medications/add-prescription-complete.html'
        }
      }
    })

    .state('app.transferPrescription', {
      url: '/transfer-prescription',
      views: {
        'menuContent': {
          templateUrl: 'app/medications/transfer-prescription.html'
        }
      },
      params: {pharmacyName: null}
    })

    .state('app.faqs', {
      url: '/faqs',
      views: {
        'menuContent': {
          templateUrl: 'app/faqs/faqs.html'
        }
      }
    })

    .state('app.delivery', {
      url: '/delivery',
      views: {
        'menuContent': {
          templateUrl: 'app/medications/delivery.html'
        }
      }
    })

    .state('app.ChatBox', {
      url: '/chat-box',
      views: {
        'menuContent': {
          templateUrl: 'app/chat/chatBox.html'
        }
      }
    });
  if (localStorage.getItem('LS_USER')) {
    console.log(localStorage.getItem('LS_USER'))
    if(JSON.parse(localStorage.getItem('LS_USER')).isAnonymous){
      $urlRouterProvider.otherwise('/core/begin');
    }
   else{
    $urlRouterProvider.otherwise('/app/medications');
   }
  } else {
    $urlRouterProvider.otherwise('/core/begin');
  }

}


function httpInterceptorConfig($httpProvider) {
  $httpProvider.interceptors.push(addLoadingBroadcast);

  function addLoadingBroadcast($rootScope) {
    var broadcastConfig = {
      request: addBroadcastShowLoading,
      requestError: addBroadcastHideLoading,
      response: addBroadcastHideLoading,
      responseError: addBroadcastHideLoading
    };
    return broadcastConfig;

    function addBroadcastShowLoading(config) {
      if (!($rootScope.disableLoading == true)) {
        $rootScope.$broadcast('loading:show');
      }
      return config;
    }

    function addBroadcastHideLoading(config) {
      $rootScope.$broadcast('loading:hide');
      return config;
    }
  }
}

app.controller('goBackCtrl', function ($scope, $ionicHistory) {
  $scope.goBackPage = function () {
    $ionicHistory.goBack();
  };
});

