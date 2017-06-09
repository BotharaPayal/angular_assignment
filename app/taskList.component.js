(function() {
    "use strict";
    var app = angular.module("tasks");

    app.component("taskList", {
        templateUrl: "./app/taskList.html",
        controllerAs: "model",
        controller: function($http, taskData) {
            var model = this;
            model.tasklist = [];

            function getCount() {
                model.progressCount = 0;
                model.pendingCount = 0;
                model.completedCount = 0;
                model.tasklist.forEach(function(obj, index) {
                    obj.id = index;
                    obj.rowChanged = false;
                    if (obj.state == "Progress") {
                        model.progressCount += 1;
                    } else if (obj.state == "Pending") {
                        model.pendingCount += 1;
                    } else if (obj.state == "Complete") {
                        model.completedCount += 1;
                    }
                });
            };

            taskData.getTaskList().$promise.then(function(response) {
                model.tasklist = response;
                getCount();
            }, function() {
                console.log("API Error");
            });
            
            model.stateList = ["Progress", "Complete", "Pending"];

            model.removeTask = function(taskId) {
                model.tasklist.splice(taskId, 1);
                model.updateTasks();
            };
            model.changeData = function(taskId) {
                model.tasklist[taskId].rowChanged = true;
            }
            model.updateTasks = function() {
                model.tasklist.forEach(function(v) {
                    delete v.rowChanged;
                });
                taskData.save(model.tasklist).$promise.then(function(response) {
                    model.tasklist = response;
                    getCount();
                }, function() {
                    console.log("API Error");
                });
            };
        }
    });
}());
