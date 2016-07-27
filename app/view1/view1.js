'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: 'vm'
  });
}])

.controller('View1Ctrl', ['$scope', '$window', '$http', 'throttleSvc', function($scope, $window, $http, throttleSvc) {
	var vm = this;
	var $w = angular.element($window);

	vm.currentData = [];
	vm.counter = 0;

	$http.get('info.json').success(function(data) {
	   vm.fullData = data;
	   	for (var i = 0; i<5; i++) {
			vm.currentData.push(vm.fullData[i]); 
			vm.counter++
		}
	});
	
	vm.handler = function() {
		vm.scroll = $w.scrollTop();
		vm.bodyHght = $('body').height();
		vm.windowHght = $(window).height();		

		if((vm.scroll + vm.windowHght) > (vm.bodyHght - 300)) {

			if(vm.counter < vm.fullData.length) {
				vm.currentData.push(vm.fullData[vm.counter]);
				vm.counter++				
			}

		}

	}

    $w.on('scroll', 
    	throttleSvc.throttle( $scope.$apply.bind($scope, vm.handler) , 100)
 			);
    
}]);