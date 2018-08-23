//create variable to hold first module, .module(name, [dependencies (additional features)])
var myApp = angular.module('myApp', []); //the 'myApp' name is what needs to be referenced within the HTML, not the variable name

//WIKI API STUFF
let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';
let linkUrl = 'https://en.wikipedia.org/wiki/';
let randomPage = 'https://en.wikipedia.org/wiki/Special:Random';

//this function runs before app loads, similar to $(document).ready
myApp.config(function(){

});

//this functions run/fires while your app is running
myApp.run(function(){

});

//Controllers are used to control various different functions of your app (Registration, Form Validation, etc)
//Proper naming convention is the name of the controller directly followed by 'Controller' ex: RegistrationController, MainController
myApp.controller('MainController', ['$scope', '$http', function($scope, $http){
var s = $scope;
s.randomLink = randomPage;

var data;

var searchTerm;
//here is an array
s.pages =[];

s.searchWiki = function(){
	s.pages = [];
	//var cb = '&callback=json&callback=JSON_CALLBACK';
	searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';
	searchTerm = s.search;

	if (searchTerm){ //check if searchTerm is empty
		$http({
			method: 'GET',
			url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm.replace(/\s+/g, '+'),
		}).then(function(response){
			data = response;
			console.log(data.data);
			for (var i = 0; i < data.data[1].length; i++) s.addNewPage(data.data[1][i], data.data[2][i], data.data[3][i]);
		}, function(error){
			console.log(error);
		});
	} else s.addNewPage("No Results");
}

//this function adds the pages to the Pages arr and also replaces any that were removed
s.addNewPage = function(title, description, url){
	s.pages.push({
		"title": title,
		"description": description,
		"url": url
	});
}




}]);