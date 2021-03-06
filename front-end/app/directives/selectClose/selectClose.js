'use strict';

angular.module('koolikottApp')
.directive('dopSelectClose',
[
    '$compile',
    function($compile) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.find('md-select-menu[multiple]').append($compile('<div data-ng-include="\'directives/selectClose/selectClose.html\'"></div>')(scope));
            },
            controller: ['$scope', function($scope) {
                $scope.closeSelect = function () {
                    angular.element(document.querySelector('.md-select-backdrop')).triggerHandler('click');
                }
            }]
        };
    }
]);
