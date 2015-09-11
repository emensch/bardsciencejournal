(function() {	
	angular
		.module('bsj')
		.controller('homeController', homeController);

	function homeController(postService) {
		var vm = this;
		vm.message = 'home';
		vm.posts = [];

		activate();

		function activate() {
			return getPosts();
		}

		function getPosts() {
			return postService.getPosts({ num: 5 })
				.then(function(data) {
					vm.posts = data;
					console.log(vm.posts);
					return vm.posts;
				});
		}
	};
})();