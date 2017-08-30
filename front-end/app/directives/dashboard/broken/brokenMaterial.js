'use strict'

angular.module('koolikottApp')
.directive('dopBrokenMaterial',
function () {
    return {
        templateUrl: 'directives/dashboard/broken/brokenMaterial.html',
        controller: ['$scope', '$filter', 'serverCallService', function ($scope, $filter, serverCallService) {
            $scope = $scope.$parent;

            function init() {
                $scope.title = $filter('translate')('BROKEN_MATERIALS');
                serverCallService.makeGet("rest/material/getBroken", {}, success, fail);
            }

            function success(data) {
                if (data) $scope.getItemsSuccess(data, 'byReportCount', true);
                else fail();
            }

            function fail() {
                console.log("Failed to get broken materials")
            }

            init();
        }]
    }
});
