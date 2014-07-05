angular.module('l42y.moment.countdown', []).directive('momentCountdown', function (
  $window,
  $timeout
) {
  var dateTypes = [
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'millisecond'
  ];

  function getDuration (time) {
    var diff = $window.moment(time).diff();

    return $window.moment.duration(diff);
  }

  function getDurationObject (time) {
    var duration = getDuration(time);
    var durationObject = {};

    angular.forEach(dateTypes, function (type) {
      var typeVal = duration[type + 's']();
      if (typeVal) {
        durationObject[type] = typeVal;
      }
    });

    return durationObject;
  }

  return {
    restrict: 'EA',
    controller: function ($scope, $element, $attrs) {
      var self = this;
      var interval = $attrs.momentInterval || 1000;

      $attrs.$observe('moment', function (time) {
        self.countdown = getDurationObject(time);

        function countdown () {
          $timeout(function () {
            self.countdown = getDurationObject(time);

            countdown();
          }, interval);
        }

        countdown();
      });
    },
    controllerAs: 'moment'
  };
});
