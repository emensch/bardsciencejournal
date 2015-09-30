(function() {
	'use strict';
	
	angular
		.module('bsj.admin')
		.controller('resetpassController', resetpassController);

	function resetpassController($routeParams, resetpassService) {
		var vm = this;

		vm.OK = false;
		vm.submitPass = submitPass;


		var username = $routeParams.username;
		var token = $routeParams.token;

		activate();

		function activate() {
			return checkToken(); 
		}

		function checkToken() {
			return resetpassService.checkToken(username, token)
				.then(checkTokenSuccess)
				.catch(checkTokenFail);

			function checkTokenSuccess() {
				vm.OK = true;
			}

			function checkTokenFail() {
				vm.OK = false;
			}
		}

		function submitPass(pwdata) {
			if(pwdata.pw1 == pwdata.pw2) {
				resetpassService.submitPass(username, token, pwdata.pw1);
			}
		}
	}
})();