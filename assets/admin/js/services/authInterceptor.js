(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.factory('authInterceptor', authInterceptor);

	function authInterceptor($q, $location, $injector) {
		var interceptor = {
			request: appendBasicHeader,
			responseError: redirectToLogin
		};

		return interceptor;

		function appendBasicHeader(request) {
			// Workaround for circular dependency injection
			var authService = $injector.get('authService');
			var user = authService.getCurrentUser();

			if(user) {
				var authStr = authService.getAuthStr(user.username, user.password);
				request.headers.Authorization = authStr;
				return request; 
			} 

			return request; 
		}

		function redirectToLogin(rejection) {
			// Workaround for circular dependency injection
			var authService = $injector.get('authService');
	
			if (rejection.status == 401) {
				authService.logout();
				$location.path('/admin/login');
			}

			return $q.reject(rejection);
		}
	}
})();