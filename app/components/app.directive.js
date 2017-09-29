app
.directive('changeLocation', function ($document) {
    return {
        //restrict: 'EAC', //E = element, A = attribute, C = class, M = comment         
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            ngModel: '=',
            callback: '&'
        },
        restrict: 'EC',
        replace: true,
        template: '<div class="auto-cpl item-underline" style="border-radius: 0px;">' +
        '<input style="padding-left:0px;" type="text" ng-model="ngModel" ng-change="change(ngModel)" ng-blur="blurLocation()"  placeholder="PHARMACY NAME" />'
        + '<div class="auto-cpl-result">' +
        '<ul>' +
        '<li ng-repeat="location in arrLocation" ng-click="select(location)">{{location.description}}</li>'
        + '</ul>'
        + '</div>'
        + '</div>',
        link: function ($scope, element, attrs) {
            
            function documentClick(e) {
                $scope.arrLocation = [];
            }


            $document.on('click', documentClick);

            // remove event handlers when directive is destroyed

            $scope.arrLocation = [];
            var service = new google.maps.places.AutocompleteService();

            function findLocation(query, cb) {
                var req = {
                    input: query
                };
                service.getQueryPredictions(req, function (predictions, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        if (typeof cb == "function") {
                            cb(predictions);
                            
                        }
                    }
                });
            }

            $scope.change = function (query) {
                if (query == "") {
                    $scope.arrLocation = [];
                    return;
                }
                findLocation(query, function (data) {
                    $scope.arrLocation = data;
                });
            };

            $scope.select = function (location) {
                $scope.ngModel = location.description;
                $scope.$eval($scope.callback({ data: location }));
                $scope.arrLocation = [];
            };

            $scope.blurLocation = function () {
                
                $scope.$eval($scope.callback({ data: $scope.ngModel }));
            };
        }
    }
})

.directive("outsideClick", ['$document', '$parse', function ($document, $parse) {
    return {
        link: function ($scope, $element, $attributes) {
            var scopeExpression = $attributes.outsideClick,
                onDocumentClick = function (event) {
                    var isChild = $element.find(event.target).length > 0;

                    if (!isChild) {
                        $scope.$apply(scopeExpression);
                    }
                };

            $document.on("click", onDocumentClick);

            $element.on('$destroy', function () {
                $document.off("click", onDocumentClick);
            });
        }
    }
}])

.directive('autoSelect', function ($document, $ionicScrollDelegate) {
    return {
        //restrict: 'EAC', //E = element, A = attribute, C = class, M = comment         
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            ngModel: '=',
            items: '=data',
            multi: '=',
            callback: '&',
            outInput: '&'
        },
        restrict: 'EC',
        replace: true,
        template: '<div class="auto-cpl" outside-click="blurDirective()">' +
        '<input type="text" ng-model="ngModel" ng-change="change(ngModel)" ng-blur="blurInput()" ng-click="openSelect()"/>'
        + '<button class="auto-btn" type="button" ng-if="ngModel && ngModel.length > 0" ng-click="remove()">x</button>'
        + '<div class="auto-result-scroll" ng-if="open">'
        + '<ion-scroll class="auto-scroll" delegate-handle="small">'
        + '<div class="auto-cpl-result-select">'
        + '<ul>'
        + '<li ng-repeat="item in items" ng-if="item.show" ng-click="select(item)">{{item.display}}</li>'
        + '</ul>'
        + '</div>'
        + '</ion-scroll>'
        + '</div>'
        + '</div>',
        link: function ($scope, element, attrs) {
            $scope.open = false;
            $scope.isSelect = false;
            $scope.data = {};
            // remove event handlers when directive is destroyed

            $scope.blurInput = function () {
                
                $scope.$eval($scope.callback({ data: $scope.data }));
            };


            // function query search for auto complete
            $scope.change = function (query) {
                $scope.data = {};
                $ionicScrollDelegate.$getByHandle('small').scrollTop();

                angular.forEach($scope.items, function (value, key) {
                    if ($scope.multi) {
                        value.show = (value.display.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
                            value.abbreviation.toLowerCase().indexOf(query.toLowerCase()) > -1;

                    }
                    else {
                        value.show = (value.display.toLowerCase().indexOf(query.toLowerCase()) > -1);

                    }
                });
            };

            $scope.remove = function () {
                $scope.data = {};
                $scope.ngModel = '';
                angular.forEach($scope.items, function (value, key) {
                    value.show = true;
                });
                $scope.isSelect = false;
            };

            $scope.openSelect = function () {
                $ionicScrollDelegate.$getByHandle('small').scrollTop();
                $scope.open = true;
            };

            $scope.blurDirective = function () {
                $scope.open = false;
            };

            $scope.select = function (value) {
                
                $scope.data = value;
                $scope.ngModel = value.display;
                $scope.open = false;
                $scope.isSelect = true;
                $scope.$eval($scope.callback({ data: value }));
            };
        }
    }
})




.directive('demoFile', function ($document) {
    return {
        //restrict: 'EAC', //E = element, A = attribute, C = class, M = comment         
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            callback: '&'
        },
        restrict: 'EC',
        replace: true,
        templateUrl: 'app/directive/page.html',
        link: function ($scope, element, attrs) {
            $scope.chooseFile = function (file) {
                var ollData = null;
                var type = 1;
                if ($scope.file) {
                    ollData = $scope.file;
                    type = 3;
                }
                $scope.$eval($scope.callback({ data: file[file.length - 1], type: type, oldData: ollData }));
                $scope.file = file[file.length - 1];
            };
            $scope.removeImage = function () {
                $scope.$eval($scope.callback({ data: $scope.file, remove: 2, oldData: null }));
                $scope.file = null;
            };

        }
    }
});