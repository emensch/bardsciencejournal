(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('newPostController', newPostController)

	function newPostController(postService) {
		var vm = this;

		vm.submitPost = submitPost;

		function submitPost() {
			
		}
	}
})();