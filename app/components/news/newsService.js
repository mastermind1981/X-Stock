var ezStockApp = angular.module('ezStockApp');


ezStockApp.factory('newsService', ['$http', function($http){
    return{
      
	  get: function(symbol, callback){
         console.log(symbol);
		
		
		$http.get('http://finance.yahoo.com/rss/headline?s='+symbol) 
				
		.success(function(data) {			
			callback(data);
        })
		.error(function(response, status) {  
			console.log("The request failed with response " + response + " and status code " + status);
		});

      }
	  
	 
		 
    };
  }]);
