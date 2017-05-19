'use strict'

angular.module('koolikottApp')
.directive('dopSlideshare',
[
    'serverCallService',
    function(serverCallService) {
        return {
            scope: {
                source: '=',
                width: '=',
                height: '=',
                failCallback: '&'
            },
            templateUrl: 'directives/slideshare/slideshare.html',
            controller: ['$scope', function($scope) {
                getSlideshareData();

                function getSlideshareData() {
                    var params = {
                        url: $scope.source,
                        format: "jsonp",
                        callback: "JSON_CALLBACK"
                    };
                    $scope.proxiedUrl = "https://localhost/rest/material/externalMaterial?url=" + encodeURIComponent("https://www.slideshare.net/api/oembed/2?url=" + $scope.source + "&format=jsonp&callback=JSON_CALLBACK");
                    serverCallService.makeJsonp($scope.proxiedUrl, [], getSlideshareDataSuccess, getSlideshareDataFail);
                }

                function getSlideshareDataSuccess(data) {
                    if (!isEmpty(data)) {
                        var embedCodeRegex = /(?:embed_code\/key\/)((\w|-)+)(?:\")/;
                        var embedCode = data.html.match(embedCodeRegex)[1];
                        $scope.embedLink = "https://www.slideshare.net/slideshow/embed_code/key/" + embedCode;
                    } else {
                        log("Slideshare data is empty. ");
                        $scope.failCallback();
                    }
                }

                function getSlideshareDataFail(data) {
                    log("Failed to get slideshare data. ");
                    $scope.failCallback();
                }
            }]
        };
    }
]);
