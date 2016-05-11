angular.module('contactsApp', ['ngRoute'])
	.config(function($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "list.html",
				controller: "ListController",
				resolve: {
					contacts: function(Contacts) {
						return Contacts.getContacts();
					}
				}
			})

			.when("/new/contact", {
				controller: "NewContactController",
				templateUrl: "contact-form.html"
			})

			.otherwise({
				redirectTo: "/"
			})
	})

	.service('Contacts', function($http){
		this.getContacts = function() {
			return $http.get("/contacts")
			.then(function(response) {
				return response;
			}, function(response) {
				alert("Error retrieving contacts.");
			});
		}
	})

	.controller('ListController', function(contacts, $scope){
		$scope.contacts = contacts.data;
	})

	.controller('NewContactController', function($scope, $location, Contacts) {
		$scope.back = function() {
			$location.path("#/");
		}
		$scope.saveContact = function(contact) {
			Contacts.createContact(contact).then(function(doc) {
				var contactUrl = "/contact/" + doc.data._id;
				$location.path(contactUrl);
			}, function(response) {
				alert(response);
			});
		}
	});