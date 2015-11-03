(function() {
	'use strict';

	angular
		.module('bsj')
		.controller('archiveController', archiveController);

	function archiveController($q, $location, $scope, $rootScope, postService, descriptorService) {
		var vm = this;
		
		vm.posts = [];
		vm.pages = 1;
		vm.types = [];
		vm.subjects = [];
		vm.params = {
			type: null,
			subject: null,
			author: null,
			search: null,
			from: null,
			to: null
		};
		vm.clearSearch = clearSearch;

		activate();

		function activate() {
			var promises = [getOptions(), getPostWithOptions(), getTypes(), getSubjects()];
			return $q.all(promises);
		}

		function getOptions() {
			var options = $location.search();
			vm.params = {
				type: options.type,
				subject: options.subject,
				author: options.author,
				search: options.search,
				from: options.from,
				to: options.to
			};
			return vm.params;
		}

		function getPostWithOptions() {
			var options = $location.search();

			return postService.getPosts(options)
				.then(function(data) {
					vm.posts = data.posts;
					vm.pages = data.pages;
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

		$rootScope.$on('searchSubmitted', function() {
			getOptions();
		});
	}
})();