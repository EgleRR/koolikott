'use strict'

angular.module('koolikottApp')
    .component('dopColumnLayout', {
        bindings: {},
        templateUrl: 'directives/pageStructure/columnLayout/columnLayout.componenet.html',
        controller: columnLayoutController
    });

columnLayoutController.$inject = ['$scope', '$mdSidenav', 'storageService'];

function columnLayoutController($scope, $mdSidenav, storageService) {
    $scope.toggleSidenav = function () {
        $mdSidenav('left').toggle();
    };

    $scope.sidenavIsOpen = function () {
        return $mdSidenav('left').isOpen();
    };

    $scope.$watch(function () {
        return storageService.getPortfolio();
    }, function (newPortfolio, oldPortfolio) {
        $scope.portfolio = newPortfolio;
    });

    $scope.portfolio = storageService.getPortfolio();
}
