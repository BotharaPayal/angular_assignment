(function() {
    "use strict";
    var app = angular.module("tasks");

    app.component("addTask", {
        templateUrl: "./app/addTask.html",
        controllerAs: "model",
        controller: function(taskData) {
            var model = this;
            model.newtask = {
                name: "",
                description: "",
                estimate: "",
                state: ""
            };

            model.stateList = ["Progress", "Complete", "Pending"];
            model.tasklist = [];

            model.addNewTask = function() {
                taskData.getTaskList().$promise.then(function(response) {
                    model.tasklist = response;
                    model.tasklist.push(model.newtask);
                    taskData.save(model.tasklist).$promise.then(function(response) {
                        model.tasklist = response;
                    }, function() {
                        console.log("API Error");
                    });
                }, function() {
                    console.log("API Error");
                });

            };
        }
    });
}());
