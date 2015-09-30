(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('descriptorsController', descriptorsController);

	function descriptorsController($q, descriptorService) {
		var vm = this;

		vm.subjects = [];
		vm.types = [];

		activate();

		function activate() {
			var promises = [getTypes(), getSubjects()];
			return $q.all(promises);
		}

		function getTypes() {
			return descriptorService.getTypes()
				.then(function(data) {
					vm.types = data;
					console.log(vm.types);
					return vm.types;
				});
		}

		function getSubjects() {
			return descriptorService.getSubjects()
				.then(function(data) {
					vm.subjects = data;
					console.log(vm.subjects);
					return vm.subjects;
				});
		}
	}
})();