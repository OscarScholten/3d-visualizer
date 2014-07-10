'use strict';

var visualizerApp = angular.module('VisualizerApp', []);

visualizerApp.controller('ShapesCtrl', function ($scope) {
  $scope.shapes = scene.getShapes();
});
