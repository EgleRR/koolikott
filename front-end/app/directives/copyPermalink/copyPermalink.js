'use strict'

angular.module('koolikottApp')
.directive('dopCopyPermalink',
function() {
    return {
        scope: {
            url: "="
        },
        templateUrl: 'directives/copyPermalink/copyPermalink.html',
        link: function(scope, element) {
            var button = element.find('button');
            var _id = button.attr('id');
            if (!_id) {
                button.attr('id', 'ngclipboard' + Date.now());
                _id = button.attr('id');
            }

            new Clipboard('#' + _id);
        },
        controller: ['$scope', '$location', 'toastService', function($scope, $location, toastService) {
            if (!$scope.url) {
                $scope.url = $location.absUrl();
            }

            $scope.showToast = function () {
                toastService.show("COPY_PERMALINK_SUCCESS")
            };
        }]
    };
});
