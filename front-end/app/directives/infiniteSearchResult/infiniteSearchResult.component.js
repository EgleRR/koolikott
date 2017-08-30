'use strict';

angular.module('koolikottApp')
    .component('dopInfiniteSearchResult', {
        bindings: {
            params: '=',
            url: '=?',
            title: '=',
            subtitle: '=',
            filter: '=',
            cache: '<?'
        },
        templateUrl: 'directives/infiniteSearchResult/infiniteSearchResult.html',
        controller: infiniteSearchResultController
    });

infiniteSearchResultController.$inject = ['serverCallService', '$scope', '$timeout'];

function infiniteSearchResultController(serverCallService, $scope, $timeout) {
    $scope.searching = false;
    $scope.accessor = {};
    let searchCount = 0;

    $scope.sortOptions = [{
        option: 'MOST_LIKED',
        field: 'like_score',
        direction: 'desc'
    }, {
        option: 'ADDED_DATE_DESC',
        field: 'added',
        direction: 'desc'
    }, {
        option: 'VIEW_COUNT_DESC',
        field: 'views',
        direction: 'desc'
    }];

    // Pagination variables
    let maxResults = $scope.params ? $scope.params.maxResults || $scope.params.limit : null;
    let expectedItemCount = maxResults;
    let initialParams = $scope.params;

    $scope.items = [];

    function init() {
        if (isEmpty($scope.url)) $scope.url = "rest/search";
        if (!$scope.params) {
            $scope.params = {};
        }

        search();
    }

    $scope.nextPage = function () {
        $timeout(function () {
            search()
        });
    };

    $scope.allResultsLoaded = function () {
        return allResultsLoaded();
    };

    function allResultsLoaded() {
        return $scope.items.length >= $scope.totalResults;
    }


    function search(newSearch) {
        if ($scope.searching) return;
        if (allResultsLoaded() && !newSearch) return;
        $scope.searching = true;

        if (searchCount === 0) {
            $scope.start = 0;
        } else {
            $scope.start = searchCount * maxResults;
        }
        $scope.params.limit = maxResults;
        $scope.params.maxResults = maxResults;
        $scope.params.start = $scope.start;

        serverCallService.makeGet(
            $scope.url,
            $scope.params,
            searchSuccess,
            searchFail,
            {},
            false,
            $scope.cache === false ? $scope.cache : true
        );
    }

    function searchSuccess(data) {
        if (!data || !data.items) {
            searchFail();
            return;
        }
        if (data.start === 0) {
            $scope.items = data.items;
        } else {
            $scope.items.push.apply($scope.items, data.items);
        }
        $scope.totalResults = data.totalResults;

        $scope.searching = false;
        searchCount++;

        searchMoreIfNecessary();
    }

    function searchFail() {
        log('Search failed.');
        $scope.searching = false;
    }

    function searchMoreIfNecessary() {
        if ($scope.items.length < expectedItemCount && !allResultsLoaded()) {
            search();
        } else {
            expectedItemCount += maxResults;
        }
    }

    $scope.sort = function (field, direction) {
        field ? $scope.params.sort = field : $scope.params.sort = initialParams.sort;
        direction ? $scope.params.sortDirection = direction : $scope.params.sortDirection = initialParams.sortDirection;
        searchCount = 0;
        expectedItemCount = maxResults;

        search(true);
    };

    init();
}
