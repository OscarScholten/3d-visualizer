'use strict';

var visualizerApp = angular.module('VisualizerApp', []);

visualizerApp.controller('ShapesCtrl', function ($scope) {
  $scope.shapes = [ { 'name': 'n1', 'value': 'v1' } ];
});
