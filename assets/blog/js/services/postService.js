(function() {
	'use strict';

	angular
		.module('bsj')
		.factory('postService', postService);

	function postService(API_PREFIX, $http, queryBuildService) {
		var service = {
			getPosts: getPosts,
			getPostBySlug: getPostBySlug
		};

		return service;

		function getPosts(options) {
			var queryStr = '';
			if (options) {
				queryStr = queryBuildService.buildQueryStr(options);
			}

			return $http.get(API_PREFIX + '/posts' + queryStr)
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