(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('newPostController', newPostController);

	function newPostController($q, $location, descriptorService, postService) {
		var vm = this;

		vm.subjects = [];
		vm.types = [];
		vm.submitPost = submitPost;

		activate();

		function activate() {
			var promises = [getTypes(), getSubjects()];
			return $q.all(promises);			
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
					return vm.subjects;
				});
		}

		function submitPost(post) {
			return postService.createPost(post)
				.then(function() {
					$location.path('/admin/posts');
				})
				.catch(function() {
					console.log('fail');
					console.log(post);
				});
		}
	}
})();