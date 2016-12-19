/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc function
 * @name ohanaApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of management console - events
 */
angular.module('ohanaApp')
    .controller('EventsCtrl', function($q, commonServices, $scope, $uibModal, $location, selectValues, DAO) {
        'use strict';

        $scope.newQuery = {};
        var allEvents = [];


        var loadAll = function() {
            var getEvents = commonServices.getPublicEvents();
            allEvents = [];
            $q.all([getEvents]).then(function(data) {
                if (data[0]) {
                    _.each(data[0], function(event, key) {
                        event.key = key;
                        allEvents.push(event);
                    });
                    $scope.eventList = allEvents;
                } else {
                    console.log('Failed to get Events...');
                }
            });
        };

        loadAll();

        $scope.search = function() {
            if (allEvents.length > 0) {
                $scope.empty = false;

                if ($scope.newQuery.search == '*' || !($scope.newQuery.search)) {
                    loadAll();
                } else {
                    var eventsFound = [];
                    _.each(allEvents, function(event) {
                        _.each(event, function(attribute) {
                            if (angular.isString(attribute) && angular.isString($scope.newQuery.search)) {
                                if (_.includes(attribute.toLowerCase(), $scope.newQuery.search.toLowerCase())) {
                                    eventsFound.push(event);
                                    return false;
                                }
                            } else if (_.includes(attribute, $scope.newQuery.search)) {
                                eventsFound.push(event);
                                return false;
                            }
                        });
                    });
                    if (eventsFound.length == 0) {
                        console.log('no results');
                        $scope.empty = true;
                        $scope.noEventsFound = "No results for " + $scope.newQuery.search + " found.";
                    }
                    $scope.eventList = eventsFound;
                }
            }
        };

        $scope.add = function() {
            var modalInstance = $uibModal.open({
                templateUrl: '/parts/newEventForm.html',
                controller: 'NewEventFormCtrl'
            });
            modalInstance.result.then(function() {
                console.log("Reloading...");
                loadAll();
            });
        };

        $scope.manageEvent = function(index) {
            var selected = allEvents[index];
            console.log('Index is: ' + index);
            console.log(selected.key);



            var getEvents = commonServices.getEvent(selected);
            console.log(getEvents);

            //match event to db
            $q.all([getEvents]).then(function(data) {
                if (data[0]) {
                    _.each(data[0], function(event, key) {
                        if (selected.key === event.key) {
                            console.log('Event: ' + event.name);
                            selected = event;
                        }
                    });
                }
            });

            DAO.selectedEvent = selected;
            $location.url('details');
            //do something
        };

        $scope.deleteEvent = function(index) {
            var selected = allEvents[index];
            console.log('Index is: ' + index);
            console.log(selected.key);

            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this event!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete '" + selected.name + "'",
                cancelButtonText: "Cancel"
            }).then(
                function(result) {
                    console.log('confirm');
                    var result = commonServices.removeData('/events/' + selected.key);
                    swal({
                        text: "Deleting " + selected.name,
                        type: 'success',
                        timer: 2500
                    });
                    $q.all([result]).then(function(data) {
                        loadAll();
                        if (data[0]) {
                            console.log(result);
                        } else {
                            console.log('Log: Error on deletion');
                        }
                    });
                },
                function(dismiss) {
                    console.log('cancel');
                }
            );
        };
    });
