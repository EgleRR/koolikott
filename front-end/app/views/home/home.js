define([
    'directives/infiniteSearchResult/infiniteSearchResult',
], function (serverCallService) {
    return ['$scope', 'serverCallService', '$rootScope',
        function ($scope, serverCallService, $rootScope) {
            $rootScope.savedPortfolio = null;
            $scope.url = "rest/search";
            $scope.params = {
                'sort': 'added',
                'sortDirection': 'desc',
                'limit': 15,
                'type': 'all'
            };
        }];
});
