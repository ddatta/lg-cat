describe('Unit: Login Controller ', function() {
    beforeEach(module('myapp'));

    var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
    beforeEach(inject(function(_$controller_, _$rootScope_) {
        // Create a new scope that's a child of the $rootScope
        scope = _$rootScope_.$new();
        // Create the controller
        ctrl = _$controller_('LoginCtrlr', {
            $scope: scope
        });
    }));
	
	it('should create $scope.greeting when calling sayHello', 
        function() {
            expect(scope.greeting).toEqual("Hello sangamesh");
        });

    it('should create $scope.greeting when calling sayHello', 
        function() {
            expect(scope.greeting).toBeUndefined();
            scope.sayHello();
            expect(scope.greeting).toEqual("Hello sangamesh");
        });
		
	 
});