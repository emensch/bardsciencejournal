(function() {
	'use strict';

	angular
		.module('bsj')
		.controller('archiveController', archiveController);

	function archiveController($q, $location, $scope, $rootScope, dateService, postService, descriptorService) {
		var vm = this;
		
		vm.posts = null;
		vm.pages = 1;
		vm.page = null;
		vm.types = null;
		vm.subjects = null;
		vm.dates = {
			first: null,
			last: null
		};
		vm.params = {
			type: null,
			subject: null,
			author: null,
			search: null,
			from: null,
			to: null,
		};
		vm.updateAuthor = updateAuthor;
		vm.clearSearch = clearSearch;
		vm.prevPage = prevPage;
		vm.nextPage = nextPage;

		activate();

		function activate() {
			var promises = [getOptions(), getPostWithOptions(), getDates(), getTypes(), getSubjects()];
			return $q.all(promises);
		}

		function getOptions() {
			var options = $location.search();
			vm.params = {
				type: options.type || null,
				subject: options.subject || null,
				author: options.author || null,
				search: options.search || null,
				from: options.from || null,
				to: options.to || null
			};
			vm.page = options.page || 1;
			return vm.params;
		}

		function getPostWithOptions() {
			var options = angular.copy($location.search());
			if(options.from) {
				options.from = dateService.shortToLong(options.from);
			}
			if(options.to) {
				options.to = dateService.shortToLong(options.to);
			}
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

		function getDates() {
			return descriptorService.getDates()
				.then(function(data) {
					vm.dates = {
						first: dateService.longToShort(data.first),
						last: dateService.longToShort(data.last)
					};
					return vm.dates;
				});
		}

		function updateAuthor(author) {
			vm.params.search = null;
			vm.params.author = author;
		}

		function clearSearch() {
			$location.search('search', null);
			vm.params.search = null;
		}

		function prevPage() {
			if(vm.page > 1) {
				$location.search('page', --vm.page > 1 ? vm.page : null);
			}
			getPostWithOptions();
		}

		function nextPage() {
			if(vm.page < vm.pages) {
				$location.search('page', ++vm.page);
			}
			getPostWithOptions();
		}

		$scope.$watchCollection('vm.params', function(newVal, oldVal) {
			if(newVal !== oldVal) {
				$location.search(vm.params);
				vm.page = 1;
				getPostWithOptions();
			}
		});

		$rootScope.$on('searchSubmitted', function() {
			getOptions();
		});
	}
})();