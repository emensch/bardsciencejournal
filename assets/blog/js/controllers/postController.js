(function() {
	'use strict';

	angular
		.module('bsj')
		.controller('postController', postController);

	function postController($routeParams, $sce, postService) {
		var vm = this;
		
		vm.displayContent = '';
		vm.post = {};
		
		activate();

		function activate() {
			return getPostBySlug();
		}

		function getPostBySlug() {
			var slug = $routeParams.slug; 
			return postService.getPostBySlug(slug)
				.then(function(data) {
					vm.post = data;
					vm.displayContent = $sce.trustAsHtml(vm.post.content);
					return vm.posts;
				});
		}
	}
})();