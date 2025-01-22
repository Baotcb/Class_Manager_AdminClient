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

        connection.start().then(() => {
            console.log("SignalR connected.");
            connection.invoke("GetNotification").catch(err => console.error(err.toString()));
            connection.invoke("GetTeacher").catch(err => console.error(err.toString()));
            connection.invoke("GetStudent").catch(err => console.error(err.toString()));
            connection.invoke("GetClass").catch(err => console.error(err.toString()));
        }).catch(err => console.error(err.toString()));

        connection.on("GetNotification", (notifications) => {
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
    }
})();


