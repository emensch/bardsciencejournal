(function() {
	angular
		.module('bsj')
		.factory('postService', postService);

	function postService(API_PREFIX, $http) {
		var service = {
			getPosts: getPosts,
			getPostBySlug: getPostBySlug
		}

		return service;

		function getPosts() {
			return $http.get(API_PREFIX + '/posts')
				.then(getPostsComplete)
				.catch(getPostsFailed);

			function getPostsComplete(res) {
				return res.data;
			}

			function getPostsFailed(res) {
				console.log('Failed to retrieve '+res.config.url);
			}
		}

		function getPostBySlug(slug) {
			return $http.get(API_PREFIX + '/posts/' + slug)
				.then(getPostBySlugComplete)
				.catch(getPostBySlugFailed);

			function getPostBySlugComplete(res) {
				return res.data;
			}

			function getPostBySlugFailed(res) {
				console.log('Failed to retrieve '+res.config.url);
			}
		}
	}
})();