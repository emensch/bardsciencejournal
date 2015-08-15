angular
	.module('bsj')
	.controller('aboutController', aboutController);

function aboutController ($scope) {
	$scope.message = 'about';
};