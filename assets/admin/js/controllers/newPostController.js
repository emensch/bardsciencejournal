(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('newPostController', newPostController);

	function newPostController($q, $location, descriptorService, postService) {
		var vm = this;

        vm.post = {};
		vm.subjects = [];
		vm.types = [];
		vm.submitPost = submitPost;

        vm.tinymceOptions = {
            height: 500,
            body_class: 'contentClass',
            content_css: '/admin/css/styles.min.css',
			plugins: 'image',
        };

		activate();

		function activate() {
			var promises = [getTypes(), getSubjects()];
			return $q.all(promises);			
		}

		function getTypes() {
			return descriptorService.getTypes()
				.then(function(data) {
					vm.types = data;
					return vm.types;
				});
		}

		function getSubjects() {
			return descriptorService.getSubjects()
				.then(function(data) {
					vm.subjects = data;
					return vm.subjects;
				});
		}

		function submitPost(post) {
            var newPost = {};
            angular.copy(post, newPost);
            newPost.authors = newPost.authors.map(function(i) {
                return i.text;
            });
			newPost.tags = newPost.tags.map(function(i) {
				return i.text;
			});
			return postService.createPost(newPost)
				.then(function() {
					$location.path('/admin/posts');
				})
				.catch(function() {
					console.log('fail');
				});
		}
	}
})();