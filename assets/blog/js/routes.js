 (function() {
	angular
		.module('bsj')
		.config(router)

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
				controllerAs: 'vm'
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
			});

			$locationProvider.html5Mode(true);
	};	
})();