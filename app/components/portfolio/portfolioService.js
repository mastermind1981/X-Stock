var ezStockApp = angular.module('ezStockApp');


ezStockApp.factory('portfolioService', ['$http', function($http){
    return{
      get: function(callback){
        
		var promise = $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%27AAPL%27)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys');
		promise.success(function(data) {			
			callback(data);
        });
		promise.error(function(response, status) {  
			console.log("The request failed with response " + response + " and status code " + status);
		});
		
      },
	  getDetail: function(symbol, callback){
         
		 //var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
         //var query = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol + '" and startDate = "' + start + '" and endDate = "' + end + '"';
         //var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + format;
		console.log(symbol);	
		var param = escape("'" + symbol.join("','") + "'");
		$http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20('+param+')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
				
		.success(function(data) {			
			callback(data);
        })
		.error(function(response, status) {  
			console.log("The request failed with response " + response + " and status code " + status);
		});

      },
	  
	  getPortfolio: function(callback){
		  var table = new AWS.DynamoDB();
			var param = {
				"KeyConditions": {
					"UserId": {
						"AttributeValueList": [{"N":"1"}],
						"ComparisonOperator": "EQ"
					}
				},
				"TableName": "Portfolio"
			};
			
			table.query(param, function(err, data) {				
				
				var str = [];
				angular.forEach(data.Items, function(value, key) {					
					this.push("'"+value.Symbol.S+"'");
				}, str);
	
					$http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20('+str+')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
						
				.success(function(data) {			
					callback(data);
				})
				.error(function(response, status) {  
					console.log("The request failed with response " + response + " and status code " + status);
				});
		
			});
	  },
	  
	  getTest: function(callback){
		  var table = new AWS.DynamoDB();
			var param = {
				"Key": {
					"Id": {
						"N":"1"
					}
				},
				"TableName": "User"
			};
			
			table.getItem(param, function(err, data) {				
				callback(data);
			});
	  }
    };
  }]);
