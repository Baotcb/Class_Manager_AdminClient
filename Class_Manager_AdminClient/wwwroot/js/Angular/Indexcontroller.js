(function () {
    'use strict';

    angular
        .module('app', ['ngRoute'])
        .controller('Indexcontroller', Indexcontroller);

    Indexcontroller.$inject = ['$scope'];

    function Indexcontroller($scope) {
        $scope.currentId = 0;
        $scope.includeUrl = '/Admin/GetLink?n=' + $scope.currentId;
        $scope.notifications = [];

        $scope.showForm = false;
        $scope.showFormClass = false;

        $scope.setId = function (id) {
            console.log("Setting ID to: " + id);
            $scope.currentId = id;
        };

        $scope.$watch('currentId', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.includeUrl = '/Admin/GetLink?n=' + newValue;
                console.log("Updated includeUrl to: " + $scope.includeUrl);
            }
        });

        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7042/adminHub")
            .build();

        const connection2 = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7236/adminHub2")
            .build();

        connection2.start().then(() => {
            console.log("SignalR2 connected.");
            connection2.invoke("GetNotification").catch(err => console.error(err.toString()));
        }).catch(err => console.error(err.toString()));


        connection.start().then(() => {
            console.log("SignalR connected.");
            
            connection.invoke("GetTeacher").catch(err => console.error(err.toString()));
            connection.invoke("GetStudent").catch(err => console.error(err.toString()));
            connection.invoke("GetClass").catch(err => console.error(err.toString()));
        }).catch(err => console.error(err.toString()));

 
        connection2.on("GetNotification", (notifications) => {
            console.log(notifications);
       
            $scope.notifications = notifications;
            $scope.$apply();
        });

        connection.on("GetTeacher", (teacher) => {
            console.log(teacher);
            $scope.teacher = teacher;
            $scope.$apply();
        });

        connection.on("GetStudent", (student) => {
            console.log(student);
            $scope.student = student;
            $scope.$apply();
        });

        connection.on("GetClass", (classs) => {
            console.log(classs);
            $scope.classs = classs;
            $scope.$apply();
        });
        
        $scope.toggleForm = function () {
            $scope.showForm = !$scope.showForm;
            console.log("showForm:", $scope.showForm); 
            if ($scope.showForm) {
                $('#teacherModal').modal('show');
            } else {
                $('#teacherModal').modal('hide');
            }
        };
        $scope.toggleFormClass = function () {
            $scope.showFormClass = !$scope.showFormClass;
            console.log("showForm:", $scope.showFormClass);
            if ($scope.showFormClass) {
                $('#classModal').modal('show');
            } else {
                $('#classModal').modal('hide');
            }
        };

        $scope.addTeacher = function () {
            var name = document.getElementById("Name").value;
            var email = document.getElementById("Email").value;
            var password = document.getElementById("password").value;

            console.log("Name:", name);
            console.log("Email:", email);
            console.log("Password:", password);

            $scope.showForm = false;
            $('#teacherModal').modal('hide');
            connection.invoke("CreateTeacher",name,email,password).catch(err => console.error(err.toString()));
        };


        $scope.addClass = function () {
            var name = document.getElementById("className").value;
            var endAt = document.getElementById("endAt").value;
            var password = document.getElementById("password").value;
            var teacherId = document.getElementById("teacherId").value;

            console.log("Class Name:", name);

            console.log("End At:", endAt);
            console.log("Password:", password);
            console.log("Teacher ID:", teacherId);

            $scope.showForm = false;
            $('#classModal').modal('hide');
            connection.invoke("CreateClass", name, password, new Date(endAt), parseInt(teacherId)).catch(err => console.error(err.toString()));
        };
        $scope.deleteClass = function (id) {
            console.log("Deleting class with id:", id);
            connection.invoke("DeleteClass", id).catch(err => console.error(err.toString()));
        };

        $scope.deleteTeacher = function (id) {
            console.log("Deleting teacher with id:", id);
            connection.invoke("DeleteTeacher", id).catch(err => console.error(err.toString()));
        };
    };
})();


