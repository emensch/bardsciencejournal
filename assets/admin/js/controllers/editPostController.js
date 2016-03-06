(function() {
    'use strict';

    angular
        .module('bsj.admin')
        .controller('editPostController', editPostController);

    function editPostController($q, $location, $routeParams, descriptorService, postService) {
        var vm = this;
        var slug = $routeParams.slug;

        vm.isEditing = true;
        vm.post = {};
        vm.subjects = [];
        vm.types = [];
        vm.submitPost = submitPost;

        activate();

        function activate() {
            var promises = [getTypes(), getSubjects(), getPostBySlug()];
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

        function getPostBySlug() {
            return postService.getPostBySlug(slug)
                .then(function(data) {
                    vm.post = data;
                    console.log(vm.post);
                    return vm.post;
                })
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
            return postService.updatePost(slug, newPost)
                .then(function() {
                    $location.path('/admin/posts');
                })
                .catch(function() {
                    console.log('fail');
                    console.log(newPost);
                });
        }
    }
})();
