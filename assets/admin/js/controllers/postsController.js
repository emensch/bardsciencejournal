(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('postsController', postsController);

	function postsController(postService) {
		var vm = this;

		vm.posts = [];
		vm.deletePost = deletePost;

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

		function deletePost(slug) {
			return postService.deletePost(slug)
				.then(function() {
					getPosts();
				});
		}
	}
})();