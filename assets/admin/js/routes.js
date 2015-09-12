(function() {
	angular
		.module('bsj.admin')
		.config(router)

	function router($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'partials/main.html',
				controller: 'mainController',
				controllerAs: 'vm'
			}) 
			.when('/login', {
				templateUrl: 'partials/login.html',
				controller: 'loginController',
				controllerAs: 'vm'
			})
			.when('/resetpassword', {
				templateUrl: 'partials/resetpass.html',
				controller: 'resetpassController',
				controllerAs: 'vm'
			});

			$locationProvider.html5Mode(true);
	};	
})();