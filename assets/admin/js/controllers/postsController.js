(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('postsController', postsController);

	function postsController(postService) {
		var vm = this;

		vm.posts = [];

		activate();

		function activate() {
			return getPosts();
		}

		function getPosts() {
			return postService.getPosts()
				.then(function(data) {
					vm.posts = data;
					console.log(vm.posts);
					return vm.posts;
				});			
		}
	}
})();