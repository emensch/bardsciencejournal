(function() {
	'use strict';

	angular
		.module('bsj')
		.controller('archiveController', archiveController);

	function archiveController($q, $location, $scope, postService, descriptorService) {
		var vm = this;
		
		vm.posts = [];
		vm.types = [];
		vm.subjects = [];
		vm.params = {
			type: null,
			subject: null,
			search: null,
			from: null,
			to: null
		};
		vm.clearSearch = clearSearch;

		activate();

		function activate() {
			var promises = [getPostWithOptions(), getTypes(), getSubjects(), getSearchTerm()];
			return $q.all(promises);
		}

		function getPostWithOptions(opts) {
			var options = $location.search();

			return postService.getPosts(options)
				.then(function(data) {
					vm.posts = data;
					console.log(data);
					return vm.posts;
				});
		}

		function getTypes() {
			return descriptorService.getTypes()
				.then(function(data) {
					vm.types = data;
					return vm.types;
				});
		}

		function getSubjects() {
			return descriptorService.getSubjects()
				.then(function(data) {
					vm.subjects = data;
					return vm.subjects;
				});
		}

		function getSearchTerm() {
			vm.params.search = $location.search().search;
			return vm.params.search;
		}

		function clearSearch() {
			$location.search('search', null);
			vm.params.search = null;
		}

		$scope.$watchCollection('vm.params', function(newVal, oldVal) {
			if(newVal !== oldVal) {
				$location.search(vm.params);
				getPostWithOptions();
			}
		});
	}
})();