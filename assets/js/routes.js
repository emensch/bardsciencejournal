angular
	.module('bsj')
	.config(router)

function router($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'homeController'
		}) 
		.when('/archive', {
			templateUrl: 'partials/archive.html',
			controller: 'archiveController'
		})
		.when('/about', {
			templateUrl: 'partials/about.html',
			controller: 'aboutController'
		});

		$locationProvider.html5Mode(true);
};