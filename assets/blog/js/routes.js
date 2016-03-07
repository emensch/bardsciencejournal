(function() {
	'use strict';

	angular
		.module('bsj')
		.config(router);

	function router($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'partials/home.html',
				controller: 'homeController',
				controllerAs: 'vm'
			}) 
			.when('/archive', {
				templateUrl: 'partials/archive.html',
				controller: 'archiveController',
				controllerAs: 'vm',
				reloadOnSearch: false
			})
			.when('/about', {
				templateUrl: 'partials/about.html',
				controller: 'aboutController',
				controllerAs: 'vm'
			})
			.when('/post/:slug', {
				templateUrl: 'partials/post.html',
				controller: 'postController',
				controllerAs: 'vm'
			})
			.otherwise({
				templateUrl: 'partials/404.html'
			});

			$locationProvider.html5Mode(true);
	};	
})();