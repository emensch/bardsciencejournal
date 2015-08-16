(function() {
	angular
		.module('bsj')
		.controller('postController', postController);

	function postController($routeParams, postService) {
		var vm = this;
		vm.message = 'post';
		vm.post = {};

		activate();

		function activate() {
			return getPostBySlug();
		}

		function getPostBySlug() {
			var slug = $routeParams.slug; 
			return postService.getPostBySlug(slug)
				.then(function(data) {
					vm.posts = data;
					console.log(vm.posts);
					return vm.posts;
				});
		}
	};
})();