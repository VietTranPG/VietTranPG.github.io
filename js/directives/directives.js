/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
LocalOS.directive('ngSpinnerBar', ['$rootScope',
    function($rootScope) {
        return {
            link: function(scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide'); // show spinner bar
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function() {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu
                   
                    // auto scorll to page top
                    setTimeout(function () {
                        App.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);     
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

// Handle global LINK click
LocalOS.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});

// Handle Dropdown Hover Plugin Integration
LocalOS.directive('dropdownMenuHover', function () {
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };  
});
//paging
LocalOS.directive('paging', function () {
    return {
        scope: {
            page: '@',
            pagesCount: '@',
            totalCount: '@',
            searchFunc: '&'
        },
        replace: true,
        restrict: 'E',
        templateUrl: 'tpl/paper-template.html',
        controller: ['$scope', function ($scope) {
            $scope.search = function (i) {
                if ($scope.searchFunc) {
                    $scope.searchFunc({ page: i });
                }
            };

            $scope.range = function () {
                if (!$scope.pagesCount) { return []; }
                var step = 2;
                var doubleStep = step * 2;
                var start = Math.max(0, $scope.page - step);
                var end = start + 1 + doubleStep;
                if (end > $scope.pagesCount) { end = $scope.pagesCount; }

                var ret = [];
                for (var i = start; i != end; ++i) {
                    ret.push(i);
                }

                return ret;
            };
        }]
    }
});
//Limit to textbox
LocalOS.directive('limitTo', function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            elem.on('cut copy paste', function (event) {
                event.preventDefault();
            });
            angular.element(elem).on("keypress", function (e) {               
                if (e.which < 48 || e.which > 57) {
                    return false;
                } else {
                    if (e.which > 48) {
                        if (parseInt(this.value) > limit - 1) {
                            return false;
                        }
                    };
                    if (this.value.length > 2) {
                        return false;
                    };
                    if ([101, 45, 43].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows
                        return false;
                    }
                }
                
            });
        }
    }
});
//specific Month textbox
LocalOS.directive('specificMonth', function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            var limit = parseInt(attrs.specificMonth);
            angular.element(elem).on("keypress", function (e) {
                console.log(e.which)
                if (e.which < 48 || e.which > 57) {
                    return false;
                } else {
                    if (e.which > 48) {
                        if (parseInt(this.value + e.key) > limit) {
                            return false;
                        }
                    };
                    if (this.value.length > 1) {
                        return false;
                    };
                    if ([101, 45, 43].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows
                        return false;
                    }
                }

            });
        }
    }
});