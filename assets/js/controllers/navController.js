angular
	.module('bsj')
	.controller('navController', navController);

function navController ($scope, $location) {
	$scope.isActive = function (path) {
		return path === $location.path();
	}
}