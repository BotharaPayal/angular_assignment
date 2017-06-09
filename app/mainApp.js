(function() {
    "use strict";

    var app = angular.module("tasks", ["ngRoute", "ngResource"]);

    app.config(function($routeProvider) {
        $routeProvider.when("/newtask", {
            template: "<add-task></add-task>"
        }).when("/tasks", {
            template: "<task-list></task-list>"
        }).otherwise({
            redirectTo: "/tasks"
        });        
    });

}());
