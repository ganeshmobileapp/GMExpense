/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:BroadcastsCtrl
 * @description
 * # BroadcastsCtrl
 * Controller of the management console - broadcasts
 */
angular.module('ohanaApp')
    .controller('BroadcastsCtrl', function($scope) {
        'use strict';
        $scope.distros = ['HOW Volunteers', 'HOW Participants'];
        $scope.recipient = [];
        $scope.ccVisible = false;
        $scope.bccVisible = false;

        $scope.toggleCC = function() {
            this.ccVisible = !this.ccVisible;
        };

        $scope.toggleBCC = function() {
            this.bccVisible = !this.bccVisible;
        };

        $scope.options = {
            height: 600,
        };

        $scope.sendTime = "";

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };

        $scope.today = function() {
            var dateToday = new Date();
            $scope.t = dateToday;
        };
        $scope.today();

        $scope.openSendDate = function() {
            $scope.sendDate.opened = true;
        };

        $scope.sendDate = {
            opened: false
        };
    });
