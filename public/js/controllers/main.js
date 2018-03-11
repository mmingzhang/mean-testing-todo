angular.module('todoController', [])

	.controller('mainCtrl', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.shopData = {};

        Todos.get()
            .success(function(data) {
                $scope.todos = data;
         });

        $scope.deleteCompleted = function(){
            $scope.todos = $scope.todos.filter(function(item){
                if (item.done === true) {
                    $scope.deleteTodo(item._id);
                }
                return !item.done
            })
        };

        $scope.addShopList = function() {
            if ($scope.shopData.text != undefined) {

                Todos.create($scope.shopData);

                getAllData();
            }
        };

		$scope.deleteTodo = function(id) {
			Todos.delete(id);

            getAllData();
		};

        var getAllData = function() {
            Todos.get()
                .success(function(data) {
                $scope.todos = data;
            });
        };
	}]);