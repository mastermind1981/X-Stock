var ezStockApp = angular.module('ezStockApp');

ezStockApp.controller('portfolioDetailController', ['$scope', '$routeParams', 'portfolioService', function($scope, $routeParams, portfolioService) {
    	
	portfolioService.getDetail($routeParams.Id, function(data){
      $scope.data = data.query.results.quote;
	  $scope.lastprice = data.query.results.quote.LastTradePriceOnly;
	  
	  //console.log(data.query.results.quote);
    });
    
	portfolioService.getChartData($routeParams.Id, function(data, previousPrice){
		
		$scope.exampleData = data;
		$scope.previousPrice = previousPrice;	
      
	  //$scope.data = data.query.results.quote;
    });
	
}]);