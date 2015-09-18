(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.factory('postService', postService);

	function postService(API_PREFIX, $q, $http, queryBuildService) {
		var service = {
			getPosts: getPosts,
			getPostBySlug: getPostBySlug,
			createPost: createPost,
			updatePost: updatePost,
			deletePost: deletePost
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

		function createPost(data) {
			return $http.post(API_PREFIX + '/posts', data)
				.then(createPostComplete)
				.catch(createPostFailed);

			function createPostComplete() {
				return $q.resolve();
			}

			function createPostFailed() {
				return $q.reject();
			}
		}

		function updatePost(slug, data) {
			return $http.put(API_PREFIX + '/posts/' + slug, data)
				.then(updatePostComplete)
				.catch(updatePostFailed);

			function updatePostComplete() {
				return $q.resolve();
			}

			function updatePostFailed() {
				return $q.reject();
			}
		}

		function deletePost(slug) {
			return $http.delete(API_PREFIX + '/posts/' + slug)
				.then(deletePostComplete)
				.catch(deletePostFailed);

			function deletePostComplete() {
				return $q.resolve();
			}

			function deletePostFailed() {
				return $q.reject();
			}
		}	
	}
})();