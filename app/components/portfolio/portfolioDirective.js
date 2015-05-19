var ezStockApp = angular.module('ezStockApp');

ezStockApp.directive('nvdLineChart', function() {
  return {
	restrict: 'AE',
	
	scope: {
		val: '=',
		width: '=',
		height: '=',
		lastprice: '@'
	},
    link: function (scope, element, attrs) {

					chart = nv.models.lineChart()
						.options({
							transitionDuration: 300,
							useInteractiveGuideline: true
						})
					;

					// chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
					chart.xAxis
						.axisLabel('')
						.tickFormat(function(d) { return d3.time.format('%I:%M')(new Date(d*1000));})
						.staggerLabels(true)
					;

					chart.yAxis
						.axisLabel('')
						.tickFormat(d3.format(',.2f'))
					;
					
		var vis = d3.select(element[0])
			.append("svg")
			.attr("width", scope.width)
			.attr("height", scope.height)
			.datum([])						
			
	
			scope.$watch('val', function (newValue, oldValue) {
				if (newValue) {
					var min = d3.min(newValue, function (d) { return parseFloat(d.y); });
					var max = d3.max(newValue, function (d) { return parseFloat(d.y); });
					chart.forceY([min - min*0.0005, max + max*0.0005]);
				
					vis.datum([
							{
								area: true,
								values: newValue,
								key: "Standard",
								color: "#ff7f0e"
							}
							/*,{
								
								values: [{"x":"1431696621","y":"110"},{"x":"1431719945","y":"110"}],
								key: "Layer1",
								color: "#2ca02c"
							}*/
					]) 
					.call(chart);		

						vis.select("g")
							.append("line")
							.style("stroke", "red")
							.style("stroke-width", "1px")
							.style("stroke-dasharray", ("3, 3"))
							.attr("x1", 0)
							.attr("y1", chart.yAxis.scale()(scope.lastprice))
							.attr("x2", 920)
							.attr("y2", chart.yAxis.scale()(scope.lastprice));

		
						nv.utils.windowResize(chart.update);						
				}
				
			});
			
			
	}
  };
});