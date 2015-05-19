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

			
		var param = escape("'" + symbol + "'");
		$http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20('+param+')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
				
		.success(function(data) {			
			callback(data);
        })
		.error(function(response, status) {  
			console.log("The request failed with response " + response + " and status code " + status);
		});

      },
	  
	  getChartData: function(symbol, callback){
		
$http.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
     $http.defaults.headers.common['Access-Control-Allow-Methods'] = "GET, POST, PUT, DELETE, OPTIONS";
     
	 
		$http.get('http://chartapi.finance.yahoo.com/instrument/1.0/'+symbol+'/chartdata;type=quote;range=1d/csv')
				
		.success(function(data) {	
			var chartData = [];
				var lines = data.split('\n');
				var previous_close = lines[8].split(':')[1];
				
				for (var i = 17; i<lines.length-1; i++) {
					var values = lines[i].split(',');
				chartData.push({x: values[0], y: values[1]});
				//chartData.push([parseInt(values[0]),parseFloat(values[1])]);
				}
			callback(chartData, previous_close);
        })
		.error(function(response, status) {  
			console.log("The request failed with response " + response + " and status code " + status);
		});

      },
	  
	  addPortfolio: function(symbol){
		  var table = new AWS.DynamoDB();
			var param = {
				"Item": {
					"UserId": {"N":"1"},
					"Symbol": {"S":symbol}
				},
				"TableName": "Portfolio"
			};
			
			table.putItem(param, function(err, data) {				
				if (err) {
					console.log(err);
				}
				else {
					console.log(symbol + ' added successfully.');
				}
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
	  
	  getSymbol: function(callback){
        
		var promise = $http.get('symbol.txt');
		promise.success(function(data) {		
			var result = [];
			var lines = data.split('\n');
		
			lines.forEach(function(d) {
				var values = d.split('|');
				result.push({name: values[1], code: values[0]});
			});
	
			callback(result);
        });
		promise.error(function(response, status) {  
			console.log("The request failed with response " + response + " and status code " + status);
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
