(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.config(router);

	function router($routeProvider, $locationProvider) {
		$routeProvider
			.when('/admin', {
				templateUrl: 'admin/partials/main.html',
				controller: 'mainController',
				controllerAs: 'vm',
				resolve: {
					checkAuth: checkAuth
				}
			})
			.when('/admin/posts', {
				templateUrl: 'admin/partials/posts.html',
				controller: 'postsController',
				controllerAs: 'vm',
				resolve: {
					checkAuth: checkAuth
				}				
			})
			.when('/admin/users', {
				templateUrl: 'admin/partials/users.html',
				controller: 'usersController',
				controllerAs: 'vm',
				resolve: {
					checkAuth: checkAuth
				}
			}) 
			.when('/admin/descriptors', {
				templateUrl: 'admin/partials/descriptors.html',
				controller: 'descriptorsController',
				controllerAs: 'vm',
				resolve: {
					checkAuth: checkAuth
				}				
			})
			.when('/admin/login', {
				templateUrl: 'admin/partials/login.html',
				controller: 'loginController',
				controllerAs: 'vm'
			})
			.when('/admin/register', {
				templateUrl: 'admin/partials/register.html',
				controller: 'registerController',
				controllerAs: 'vm'
			})
			.when('/admin/resetpassword', {
				templateUrl: 'admin/partials/resetpass.html',
				controller: 'resetpassController',
				controllerAs: 'vm'
			});

			$locationProvider.html5Mode(true);
	}

	function checkAuth($q, $location, authService) {
		var deferred = $q.defer();

		if(authService.getCurrentUser()) {
			deferred.resolve();
		} else {
			deferred.reject();
			$location.path('/admin/login');
		}

		return deferred.promise;
	}
})();