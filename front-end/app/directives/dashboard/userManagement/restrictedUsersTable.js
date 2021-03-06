'use strict'

angular.module('koolikottApp')
.directive('dopRestrictedUsersTable',
function () {
    return {
        templateUrl: 'directives/dashboard/userManagement/usersTable.html',
        controller: ['$scope', 'serverCallService', '$filter', function ($scope, serverCallService, $filter) {
            $scope.showTaxonColumn = false;
            $scope = $scope.$parent;

            function init() {
                $scope.title = $filter('translate')('RESTRICTED_USERS_TAB');
                serverCallService.makeGet("rest/user/restrictedUser", {}, success, fail)
            }

            function success(data) {
                if (data) $scope.getItemsSuccess(data, 'byUsername', false);
                else fail();
            }

            function fail() {
                console.log("Failed to get users")
            }

            init();
        }]
    }
});
