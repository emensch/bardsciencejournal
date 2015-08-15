angular
	.module('bsj')
	.controller('homeController', homeController);

function homeController(postService) {
	var vm = this;
	vm.message = 'home';
};