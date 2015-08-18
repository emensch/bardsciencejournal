(function() {
	angular
		.module('bsj')
		.controller('archiveController', archiveController);

	function archiveController($location, postService) {
		var vm = this;
		vm.message = 'archive';
		vm.posts = [];

		activate();

		function activate() {
			return getPostWithOptions();
		}

		function getPostWithOptions() {
			var options = $location.search();

			return postService.getPosts(options)
				.then(function(data) {
					vm.posts = data;
					console.log(vm.posts);
					return vm.posts;
				});
		}
	};
})();