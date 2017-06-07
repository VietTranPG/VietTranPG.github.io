angular.module('LocalOS')
.factory('logoutService', function ($http, $q, $rootScope, $state) {
    return {
        logout: function (isbutton) {
            if (isbutton == 0) {
                var confirmLogin = confirm("Are you sure you wish to exit the application?");
                if (confirmLogin == true) {
                    var urlLogout = SERVER_API + "api/admin/logout";
                    $http.get(urlLogout, { withCredentials: true }).success(function (rs) {
                        if (rs.Status == "Success") {

                            localStorage.removeItem("profileUser");

                            if ($rootScope.dataSearch) {
                                delete $rootScope.dataSearch;
                            }
                            if ($rootScope.caseSearchModel) {
                                delete $rootScope.caseSearchModel;
                            }
                            if ($rootScope.pageSelectItem) {
                                delete $rootScope.pageSelectItem;
                            }
                            if ($rootScope.indexItem) {
                                delete $rootScope.indexItem;
                            }
                            if ($rootScope.pagingSearch) {
                                delete $rootScope.pagingSearch;
                            }
                            $state.go("core.login");
                        }
                    }).error(function (err) {
                        console.log(err);
                    });
                } else {
                    $state.go("app.listUser");
                }
            } else {                
                var urlLogout = SERVER_API + "admin/logout";
                $http.post(urlLogout, {} ,{ withCredentials: true }).success(function (rs) {
                    if (rs.Status == STATUS_SUCCESS) {
                        window.localStorage.setItem('logged', 0);
                        $state.go("core.login");
                    }
                }).error(function (err) {
                    console.log(err);
                });
            }
        }
    }
});

