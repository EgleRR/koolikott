'use strict'

angular.module('koolikottApp')
.component('dopShare', {
    bindings: {
        title: '<',
        object: '<'
    },
    templateUrl: 'directives/share/share.html',
    controller: dopShareController
});

dopShareController.$inject = ['$scope', '$rootScope', '$location', '$window', 'translationService', '$translate', 'authenticatedUserService', '$mdDialog', 'serverCallService', 'toastService', 'Socialshare', 'FB_APP_ID', 'GOOGLE_SHARE_CLIENT_ID', '$timeout'];

function dopShareController($scope, $rootScope, $location, $window, translationService, $translate, authenticatedUserService, $mdDialog, serverCallService, toastService, Socialshare, FB_APP_ID, GOOGLE_SHARE_CLIENT_ID, $timeout) {
    let vm = this;

    vm.$onInit = () => {
        vm.isOpen = false;
        vm.pageUrl = $location.absUrl();
        vm.pictureName = '';

        vm.shareMediaPlaces = [
            {
                'provider': 'email',
                'icon': 'icon-mail-squared'
            }, {
                'provider': 'google',
                'icon': 'icon-gplus-squared'
            }, {
                'provider': 'twitter',
                'icon': 'icon-twitter-squared'
            }, {
                'provider': 'facebook',
                'icon': 'icon-facebook-squared'
            }
        ];

        $timeout(() => {
            if (vm.object && vm.object.picture) {
                vm.pictureName = vm.object.picture.name;
            }

            initGoogleButton();
        });
    };

    function initGoogleButton () {
        let options = {
            contenturl: vm.pageUrl,
            clientid: GOOGLE_SHARE_CLIENT_ID,
            cookiepolicy: $location.$$protocol + '://' + $location.$$host,
            prefilltext: vm.title,
            calltoactionurl: vm.pageUrl
        };

        gapi.interactivepost.render('shareGoogleFakeButton', options);
    }

    vm.isVisible = () => {
        if (vm.object && vm.object.deleted || $rootScope.isEditPortfolioPage) {
            return false;
        }

        if ($rootScope.isViewMaterialPage) {
            return true;
        }

        if (vm.object) {
            if (isPublic() || isNotListed() || isOwner() || authenticatedUserService.isAdmin() || authenticatedUserService.isModerator()) {
                return true;
            } else if (isPrivate()) {
                return false;
            }
        }

        return false;
    };

    function isPublic() {
        return vm.object.visibility === 'PUBLIC';
    }

    function isPrivate() {
        return vm.object.visibility === 'PRIVATE';
    }

    function isNotListed() {
        return vm.object.visibility === 'NOT_LISTED';
    }

    function isOwner () {
        if (!authenticatedUserService.isAuthenticated()) {
            return false;
        }

        if (vm.object && vm.object.creator) {
            let creatorId = vm.object.creator.id;
            let userId = authenticatedUserService.getUser().id;
            return creatorId === userId;
        }
    }

    vm.share = ($event, item) => {
        if (isMaterial(vm.object.type)) {
            setShareParams(item);
        } else if (isPortfolio(vm.object.type)) {
            if ((!isOwner() && !isPublic()) || (isOwner() && isPrivate())) {
                $event.preventDefault();
                showWarningDialog($event, item);
            } else {
                setShareParams(item);
            }
        }
    };

    function showWarningDialog (ev, item) {
        $mdDialog.show({
            templateUrl: 'directives/share/modal/share.modal.html',
            controller: 'shareModalController',
            controllerAs: '$ctrl',
            targetEvent: ev,
            locals: {
                item: item,
                portfolio: vm.object,
                setShareParams: setShareParams,
                isOwner: isOwner,
                isPrivate: isPrivate
            }
        });
    }

    function setShareParams(item) {
        if (!item) return;

        switch (item.provider) {
            case 'facebook':
                Socialshare.share({
                    'provider': item.provider,
                    'attrs': {
                        'socialshareUrl': vm.pageUrl,
                        'socialshareTitle': $translate.instant('READING_RECOMMENDATION') + ': ' + vm.title,
                        'socialshareMedia': $location.$$protocol + '://' + $location.$$host + '/rest/picture/thumbnail/lg/' + vm.pictureName,
                        'socialshareType': 'share',
                        'socialshareVia': FB_APP_ID
                    }
                });
            break;
            case 'twitter':
                Socialshare.share({
                    'provider': item.provider,
                    'attrs': {
                        'socialshareUrl': vm.pageUrl,
                        'socialshareText': $translate.instant('READING_RECOMMENDATION') + ': ' + vm.title
                    }
                });
            break;
            case 'email':
                Socialshare.share({
                    'provider': item.provider,
                    'attrs': {
                        'socialshareSubject': $translate.instant('READING_RECOMMENDATION') + ': ' + vm.title,
                        'socialshareBody': $translate.instant('WELCOME_READ_HERE') + ': ' + vm.pageUrl
                    }
                });
            break;
            case 'google':
                angular.element(document.getElementById('shareGoogleFakeButton')).triggerHandler('click');
            break;
        }
    }
}
