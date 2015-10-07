(function() {	
	'use strict';

	angular
		.module('bsj')
		.controller('homeController', homeController);

	function homeController(postService) {
		var vm = this;
		
		vm.message = 'home';
		vm.featured = [];
		vm.recent = [];

		activate();

		function activate() {
			return getPosts();
		}

		function getPosts() {
			return postService.getPosts({ num: 6 })
				.then(function(data) {
					vm.featured = data;
					vm.recent = data.slice(0, 3);
					console.log(vm.featured);
					console.log(vm.recent);
					return vm.posts;
				});
		}
	}
})();