angular
	.module('bsj')
	.controller('homeController', homeController);

function homeController ($scope) {
	$scope.message = 'home';
};