var app = angular.module('todoApp', []);

app.service('TaskService', function() {
  let tasks = [];

  // Get all tasks (initially empty)
  this.getTasks = function() {
    return tasks;
  };

  // Add a new task
  this.addTask = function(taskTitle) {
    const newTask = {
      id: tasks.length + 1, // This logic can be improved
      title: taskTitle,
      completed: false
    };
    tasks.push(newTask);
  };

  // Update an existing task (for marking as completed)
  this.updateTask = function(task) {
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
    }
  };

  // Delete a task by ID
  this.deleteTask = function(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
  };

  // Ensure that getTasks returns the updated task list
  this.getUpdatedTasks = function() {
    return tasks;
  };
});

app.controller('TodoController', function($scope, $http, TaskService) {
  $scope.tasks = TaskService.getTasks(); // Fetch tasks from the service
  $scope.taskTitle = '';

  // Add a new task using the service
  $scope.addTask = function() {
    if ($scope.taskTitle) {
      // Make the POST request to add the new task
      $http.post('http://localhost:5000/tasks', { title: $scope.taskTitle })
        .then(function(response) {
          // On success, update the task list and clear the input
          $scope.tasks.push(response.data); // Add the new task to the list
          $scope.taskTitle = ''; // Clear the input field after adding
        })
        .catch(function(error) {
          console.error('Error adding task:', error);
        });
    }
  };

  // Update a task using the service (for marking complete/incomplete)
  $scope.updateTask = function(task) {
    TaskService.updateTask(task);
  };

  // Delete a task using the service
  $scope.deleteTask = function(taskId) {
    TaskService.deleteTask(taskId);
    $scope.tasks = TaskService.getUpdatedTasks(); // Refresh task list after deletion
  };
});
