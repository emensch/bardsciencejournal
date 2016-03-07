(function() {	
	'use strict';

	angular
		.module('bsj')
		.controller('homeController', homeController);

	function homeController($q, postService) {
		var vm = this;
		
		vm.message = 'home';
		vm.featured = [];
		vm.recent = [];

		activate();

		function activate() {
			//var promises = [getFeaturedPosts(), getRecentPosts()];
			var promises = [getFeaturedPosts()];
			return $q.all(promises);
		}

		function getFeaturedPosts() {
			return postService.getPosts({ num: 6, featured: true })
				.then(function(data) {
					vm.featured = data.posts;
					return vm.featured;
				});
		}

		function getRecentPosts() {
			return postService.getPosts({ num: 3, featured: false })
				.then(function(data) {
					vm.recent = data.posts;
					return vm.recent;
				});			
		}
	}
})();