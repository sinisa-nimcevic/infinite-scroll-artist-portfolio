(function () {
    'use strict';

    angular
        .module('myApp')
        .directive('imageonload', imageonload);

    function imageonload() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    attrs.$set('class', 'image-loaded');
                });
                element.bind('error', function(){
                    console.log('image could not be loaded');
                });
            }
        };
    }

})();