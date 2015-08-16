var directives = angular.module('sp.directives', []);
    directives.filter('tel', function () {
        return function (tel) {
            if (!tel) { return ''; }
            return tel.slice(0, 2) + '-' + tel.slice(2, 5) + '-' + tel.slice(5, 8) + '-' + tel.slice(8);
        };
    }).directive('parallax', ['$window', function($window) {
        return {
            restrict: 'A',
            scope: {
                parallaxRatio: '@',
                parallaxVerticalOffset: '@',
                parallaxHorizontalOffset: '@',
            },
            link: function($scope, elem, attrs) {
                var setPosition = function () {
                    var calcValY = $window.pageYOffset * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1 );
                    if (calcValY <= $window.innerHeight) {
                        var topVal = (calcValY < $scope.parallaxVerticalOffset ? $scope.parallaxVerticalOffset : calcValY);
                        elem.css('transform','translate(' + $scope.parallaxHorizontalOffset + 'px, ' +topVal+ 'px)');
                    }
                };

                setPosition();

                angular.element($window).bind("scroll", setPosition);
                angular.element($window).bind("touchmove", setPosition);
            }  // link function
        };
    }]).directive('parallaxBackground', ['$window', function($window) {
        return {
            restrict: 'A',
            transclude: true,
            template: '<div ng-transclude></div>',
            scope: {
                parallaxRatio: '@',
            },
            link: function($scope, elem, attrs) {
                var setPosition = function () {
                    var calcValY = (elem.prop('offsetTop') - $window.pageYOffset) * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1 );
                    // horizontal positioning
                    elem.css('background-position', "50% " + calcValY + "px");
                };

                // set our initial position - fixes webkit background render bug
                angular.element($window).bind('load', function(e) {
                    setPosition();
                    $scope.$apply();
                });

                angular.element($window).bind("scroll", setPosition);
                angular.element($window).bind("touchmove", setPosition);
            }  // link function
        };
    }]);