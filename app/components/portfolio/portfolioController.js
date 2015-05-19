var ezStockApp = angular.module('ezStockApp');

ezStockApp.controller('portfolioController', ['$scope', '$location', 'portfolioService', function($scope, $location, portfolioService) {
    
	$scope.loadPortfolio = function() {
		portfolioService.getPortfolio(function(data){
		
		//console.log(JSON.stringify(data.query.results.quote));
		$scope.data = data.query.results;
		$scope.url = $location.path();  
		//$scope.$apply();
		});
	}
	
	//Load Portfolio
	$scope.loadPortfolio();
	
	portfolioService.getSymbol(function(data){
		$scope.symbol = data;			
		//console.log(data);	
	});
	
    $scope.add = function (id) {
		portfolioService.addPortfolio(id);
		$scope.loadPortfolio();
	};
     
}]);