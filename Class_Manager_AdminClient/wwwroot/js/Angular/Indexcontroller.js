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
        }).catch(err => console.error(err.toString()));

        connection.on("GetNotification", (notifications) => {
            console.log(notifications);
            $scope.notifications = notifications;
            $scope.$apply(); 
        });
    }
})();


