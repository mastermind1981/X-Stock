var ezStockApp = angular.module('ezStockApp', ['ngRoute']);

ezStockApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'app/components/home/homeView.html',
        controller: 'homeController'
      }).
	  when('/portfolio', {
        templateUrl: 'app/components/portfolio/portfolioView.html',
        controller: 'portfolioController'
      }).
      when('/portfolio/:Id', {
        templateUrl: 'app/components/portfolio/portfolioDetailView.html',
        controller: 'portfolioDetailController'
      }).
	  when('/news', {
        templateUrl: 'app/components/news/newsView.html',
        controller: 'newsController'
      }).
      otherwise({
        redirectTo: '/'
      });
	  
	  
  }]);
  
