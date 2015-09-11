(function() {
	angular
		.module('bsj')
		.controller('archiveController', archiveController);

	function archiveController($q, $location, postService, descriptorService) {
		var vm = this;
		vm.message = 'archive';
		vm.posts = [];
		vm.types = [];
		vm.subjects = [];

		activate();

		function activate() {
			var promises = [getPostWithOptions(), getTypes(), getSubjects()];
			return $q.all(promises);
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

		function getTypes() {
			return descriptorService.getTypes()
				.then(function(data) {
					vm.types = data;
					console.log(vm.types);
					return vm.types;
				});
		}

		function getSubjects() {
			return descriptorService.getSubjects()
				.then(function(data) {
					vm.subjects = data;
					console.log(vm.subjects);
					return vm.types;
				})
		}
	};
})();