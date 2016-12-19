'use strict';

describe('Controller: ExpenseViewexpenseCtrl', function () {

  // load the controller's module
  beforeEach(module('ohanaApp'));

  var ExpenseViewexpenseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpenseViewexpenseCtrl = $controller('ExpenseViewexpenseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpenseViewexpenseCtrl.awesomeThings.length).toBe(3);
  });
});
