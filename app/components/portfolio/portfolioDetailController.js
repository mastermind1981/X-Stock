var ezStockApp = angular.module('ezStockApp');

ezStockApp.controller('portfolioDetailController', ['$scope', '$routeParams', 'portfolioService', function($scope, $routeParams, portfolioService) {
    
	var symbol = [$routeParams.Id];
	
	portfolioService.getDetail(symbol, function(data){
      $scope.data = data.query.results.quote;
    });
     
}]);