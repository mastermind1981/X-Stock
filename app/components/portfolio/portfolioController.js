var ezStockApp = angular.module('ezStockApp');

ezStockApp.controller('portfolioController', ['$scope', '$location', 'portfolioService', function($scope, $location, portfolioService) {
    
	portfolioService.getPortfolio(function(data){
		
	//console.log(JSON.stringify(data.query.results.quote));
    $scope.data = data.query.results;
	$scope.url = $location.path();  
	//$scope.$apply();
	  
	  
    });
	
    
     
}]);