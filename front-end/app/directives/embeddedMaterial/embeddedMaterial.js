'use strict'

angular.module('koolikottApp').directive('dopEmbeddedMaterial', [
    'translationService', 'iconService', 'embedService', 'serverCallService', 'dialogService', 'storageService', '$rootScope', '$sce', 'materialService', '$route',
    function (translationService, iconService, embedService, serverCallService, dialogService, storageService, $rootScope, $sce, materialService, $route) {
        return {
            scope: {
                material: '=',
                chapter: '=',
                objIndex: '=',
                rowIndex: '=',
                contentRow: '=',
                embeddable: '='
            },
            templateUrl: 'directives/embeddedMaterial/embeddedMaterial.html',
            controller: ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
                init();

                $scope.showMaterialContent = false;

                $rootScope.$on('fullscreenchange', () => {
                    $scope.$apply(() => {
                        $scope.showMaterialContent = !$scope.showMaterialContent;
                    });
                });

                $scope.showSourceFullscreen = ($event, ctrl) => {
                    $event.preventDefault();
                    ctrl.toggleFullscreen();
                };

                $scope.init = function () {
                    init();
                };

                function init() {
                    $scope.canPlayVideo = false;
                    $scope.canPlayAudio = false;
                    $scope.videoType = "";
                    $scope.audioType = "";
                    $scope.sourceType = "";
                    $scope.isEditPortfolioPage = $rootScope.isEditPortfolioPage;
                    $scope.isEditPortfolioMode = $rootScope.isEditPortfolioMode;
                    $scope.videoTheme = "http://www.videogular.com/styles/themes/default/latest/videogular.css";

                    if(!$scope.material){
                        getMaterial(getMaterialSuccess, getMaterialFail);
                    }

                    if ($scope.material) {
                        $scope.material.source = getSource($scope.material);
                        $scope.materialType = getType();
                        getSourceType();
                        getContentType();
                    }
                }

                function getMaterial(success, fail) {
                    materialService.getMaterialById($route.current.params.id)
                        .then(success, fail);
                }

                function getMaterialSuccess(material) {
                    if (isEmpty(material)) {
                        log('Could not load material, cannot embed.');
                    } else {
                        $scope.material = material;
                        getSourceType();
                        getContentType();
                    }
                }

                function getMaterialFail() {
                    log('Getting material failed, cannot embed.');
                }

                $scope.$watch(function () {
                    return $scope.material;
                }, function () {
                    if ($scope.material && $scope.material.id) {
                        getContentType();
                        $scope.material.source = getSource($scope.material);
                    }
                });

                function getContentType() {
                    var baseUrl = document.location.origin;
                    var materialSource = getSource($scope.material);
                    // If the initial type is a LINK, try to ask the type from our proxy
                    if (materialSource && (matchType(materialSource) === 'LINK' || !materialSource.startsWith(baseUrl))) {
                        $scope.fallbackType = matchType(materialSource);
                        $scope.proxyUrl = baseUrl + "/rest/material/externalMaterial?url=" + encodeURIComponent($scope.material.source);
                        //serverCallService.makeHead($scope.proxyUrl, {}, probeContentSuccess, probeContentFail);
                    }
                    if (materialSource) {
                        $scope.sourceType = matchType(getSource($scope.material));
                    }
                }

                function probeContentSuccess(response) {
                    if (!response()['content-disposition']) {
                        $scope.sourceType = $scope.fallbackType;
                        return;
                    }
                    var filename = response()['content-disposition'].match(/filename="(.+)"/)[1];
                    $scope.sourceType = matchType(filename);
                    if ($scope.sourceType !== 'LINK') {
                        if ($scope.sourceType == 'PDF')$scope.material.PDFLink = "/utils/pdfjs/web/viewer.html?file=" + encodeURIComponent($scope.proxyUrl);
                    }
                }

                function probeContentFail() {
                    console.log("Content probing failed!");
                }

                $scope.removeMaterial = function ($event, material) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    var removeMaterialFromChapter = function () {
                        var index = $scope.contentRow.learningObjects.indexOf(material);
                        $scope.contentRow.learningObjects.splice(index, 1);
                    };

                    dialogService.showDeleteConfirmationDialog(
                        'PORTFOLIO_DELETE_MATERIAL_CONFIRM_TITLE',
                        'PORTFOLIO_DELETE_MATERIAL_CONFIRM_MESSAGE',
                        removeMaterialFromChapter);
                };

                $scope.getCorrectLanguageTitle = function (material) {
                    if (material) {
                        return getCorrectLanguageString(material.titles, material.language);
                    }
                };

                $scope.moveItem = function (origin, destination) {
                    if ($scope.contentRow && $scope.contentRow.learningObjects.length < 2) {
                        $scope.chapter.contentRows.splice(origin, 1);
                    }

                    $scope.chapter.contentRows.splice(destination, 0, {learningObjects: [$scope.material]});
                };

                $scope.listItemUp = function () {
                    $scope.moveItem($scope.rowIndex, $scope.rowIndex - 1);
                };

                $scope.listItemDown = function () {
                    $scope.moveItem($scope.rowIndex, $scope.rowIndex + 1);
                };

                $scope.navigateToMaterial = function (material, $event) {
                    $event.preventDefault();
                    storageService.setMaterial(material);


                    $location.path('/material').search({
                        id: material.id
                    });
                };

                $scope.fallbackToLink = function () {
                    return $scope.isEditPortfolioMode || !$scope.sourceType || $scope.sourceType === 'LINK';
                };

                $scope.$on('material:saved', function() {
                    init();
                });

                function canPlayVideoFormat() {
                    let extension = getSource($scope.material).split('.').pop();
                    let v = document.createElement('video');
                    $scope.videoType = extension;
                    if (v.canPlayType('video/' + extension)) {
                        $scope.canPlayVideo = true;
                    }
                }

                function canPlayAudioFormat() {
                    let extension = getSource($scope.material).split('.').pop();
                    let v = document.createElement('audio');
                    $scope.audioType = extension;
                    if (v.canPlayType('audio/' + extension)) {
                        $scope.canPlayAudio = true;
                    }
                }

                function getSourceType() {
                    if($scope.material && $scope.material.uploadedFile){
                        $scope.ebookLink = "/utils/bibi/bib/i/?book=" + $scope.material.uploadedFile.id + "/" + $scope.material.uploadedFile.name;
                    }

                    if($scope.material){
                        $scope.material.PDFLink = $sce.trustAsResourceUrl("/utils/pdfjs/web/viewer.html?file=" + $scope.material.source);
                    }

                    if (isYoutubeVideo($scope.material.source)) {
                        $scope.sourceType = 'YOUTUBE';
                    } else if (isSlideshareLink($scope.material.source)) {
                        $scope.sourceType = 'SLIDESHARE';
                    } else if (isVideoLink($scope.material.source)) {
                        if($scope.material.source) {
                            $scope.material.videoSource = [
                                {src: $sce.trustAsResourceUrl($scope.material.source), type: "video/ogv"},
                                {src: $sce.trustAsResourceUrl($scope.material.source), type: "video/mp4"},
                                {src: $sce.trustAsResourceUrl($scope.material.source), type: "video/webm"},
                            ];
                            canPlayVideoFormat();
                            $scope.sourceType = 'VIDEO';
                        }
                    } else if (isAudioLink($scope.material.source)) {
                        if($scope.material.source){
                            $scope.material.audioSource = [
                                {src: $sce.trustAsResourceUrl($scope.material.source), type: "audio/ogg"},
                                {src: $sce.trustAsResourceUrl($scope.material.source), type: "audio/mp3"},
                                {src: $sce.trustAsResourceUrl($scope.material.source), type: "video/wav"},
                            ];
                            canPlayAudioFormat();
                            $scope.sourceType = 'AUDIO';
                        }
                        $scope.audioSource = $scope.material.source;
                    } else if (isPictureLink($scope.material.source)) {
                        $scope.sourceType = 'PICTURE';
                    } else if (isEbookLink($scope.material.source)) {
                        if (isIE()) {
                            $scope.sourceType = 'LINK';
                            $scope.material.source += "?archive=true";
                            return;
                        }
                        $scope.sourceType = 'EBOOK';
                        // if($('.ebook-container iframe').length !== 0){
                        //     $('.ebook-container iframe')[0].src = $scope.ebookLink;
                        // }
                    } else if (isPDFLink($scope.material.source)) {
                        $scope.sourceType = 'PDF';
                        // if($('.pdf-container iframe').length !== 0){
                        //     $('.pdf-container iframe')[0].src = $scope.material.PDFLink;
                        // }
                    } else {
                        embedService.getEmbed(getSource($scope.material), embedCallback);
                    }
                }

                function isYoutubeVideo(url) {
                    // regex taken from http://stackoverflow.com/questions/2964678/jquery-youtube-url-validation-with-regex #ULTIMATE YOUTUBE REGEX
                    var youtubeUrlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                    return url && url.match(youtubeUrlRegex);
                }

                function isSlideshareLink(url) {
                    var slideshareUrlRegex = /^https?\:\/\/www\.slideshare\.net\/[a-zA-Z0-9\-]+\/[a-zA-Z0-9\-]+$/;
                    return url && url.match(slideshareUrlRegex);
                }

                function isVideoLink(url) {
                    if (!url) return;
                    var extension = url.split('.').pop().toLowerCase();
                    return extension == "mp4" || extension == "ogv" || extension == "webm";
                }

                function isAudioLink(url) {
                    if (!url) return;
                    var extension = url.split('.').pop().toLowerCase();
                    return extension == "mp3" || extension == "ogg" || extension == "wav";
                }

                function isPictureLink(url) {
                    if (!url) return;
                    var extension = url.split('.').pop().toLowerCase();
                    return extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "gif";
                }

                function isEbookLink(url) {
                    if (!url) return;
                    var extension = url.split('.').pop().toLowerCase();
                    return extension == "epub";
                }

                function isPDFLink(url) {
                    if (!url) return;
                    var extension = url.split('.').pop().toLowerCase();
                    return extension == "pdf";
                }

                function getType() {
                    if ($scope.material === undefined || $scope.material === null) return '';

                    return iconService.getMaterialIcon($scope.material.resourceTypes);
                }

                function getCorrectLanguageString(languageStringList, materialLanguage) {
                    if (languageStringList) {
                        return getUserDefinedLanguageString(languageStringList, translationService.getLanguage(), materialLanguage);
                    }
                }

                function embedCallback(res) {
                    if (res && res.data.html) {
                        $scope.embeddedDataIframe = null;
                        $scope.embeddedData = null;
                        $scope.sourceType = 'NOEMBED';

                        if (res.data.html.contains("<iframe")) {
                            $scope.embeddedDataIframe = res.data.html.replace("http:", "");
                        } else {
                            $scope.embeddedData = res.data.html.replace("http:", "");
                        }
                    } else {
                        if ($scope.material.source) {
                            $scope.iframeSource = $sce.trustAsResourceUrl($scope.material.source.replace("http:", ""));
                        }
                    }
                }

            }],
        };
    }
]);
