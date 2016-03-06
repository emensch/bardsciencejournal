(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('postsController', postsController);

	function postsController(postService, $location) {
		var vm = this;
		vm.posts = [];
        vm.pages = 1;
        vm.page = 1;
        vm.editPost = editPost;
		vm.deletePost = deletePost;
        vm.prevPage = prevPage;
        vm.nextPage = nextPage;

		activate();

		function activate() {
			return getPosts();
		}

		function getPosts() {
			return postService.getPosts({page: vm.page})
				.then(function(data) {
					vm.posts = data.posts;
                    vm.pages = data.pages;
					console.log(vm.posts);
					return vm.posts;
				});			
		}

        function editPost(slug) {
            $location.path('/admin/posts/edit/'+slug);
        }

		function deletePost(slug) {
			return postService.deletePost(slug)
				.then(function() {
					getPosts();
				});
		}

        function prevPage() {
            if(vm.page > 1) {
                vm.page--;
                getPosts();
            }
        }

        function nextPage() {
            if(vm.page < vm.pages) {
                vm.page++;
                getPosts();
            }
        }
	}
})();