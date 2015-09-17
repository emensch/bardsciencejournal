(function() {
	angular
		.module('bsj.admin')
		.factory('authInterceptor', authInterceptor);

	function authInterceptor($injector) {
		var interceptor = {
			request: appendBasicHeader
		}

		return interceptor;

		function appendBasicHeader(config) {
			// Workaround for circular dependency injection
			var authService = $injector.get('authService');
			var user = authService.getCurrentUser();

			if(user) {
				console.log('user logged in');
				var authStr = getAuthStr(user.username, user.password);
				config.headers['Authorization'] = authStr;
				return config; 
			} 

			return config; 
		}
	}
})();