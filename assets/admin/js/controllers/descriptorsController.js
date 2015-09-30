(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('descriptorsController', descriptorsController);

	function descriptorsController($q, descriptorService) {
		var vm = this;

		vm.subjects = [];
		vm.types = [];
		vm.addType = addType;
		vm.addSubject = addSubject;
		vm.deleteType = deleteType;
		vm.deleteSubject = deleteSubject;

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

		function addType(name) {
			return descriptorService.createType({ name: name })
				.then(function() {
					getTypes();
				});
		}

		function addSubject(name) {
			return descriptorService.createSubject({ name: name })
				.then(function() {
					getSubjects();
				});
		}

		function deleteType(type) {
			return descriptorService.deleteType(type.slug)
				.then(function() {
					getTypes();
				});
		}

		function deleteSubject(subject) {
			return descriptorService.deleteSubject(subject.slug)
				.then(function() {
					getSubjects();
				});
		}
	}
})();