(function() {
    "use strict";
    var app = angular.module("tasks").factory('taskData', function($resource) {
        return {
            getTaskList: function() {
                return $resource('/tasksAPI').query();
            },
            save: function(newtask) {
                return $resource('/tasksAPI',{}, {saveData: {method:'POST', isArray: true}}).saveData({}, newtask);
            }
        }
    });
}());
