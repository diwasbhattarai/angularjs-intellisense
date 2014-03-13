//_moduleDecorator
(function () {
    var originalModule = angular.module;
    // TODO change to array
    modules = {};
    var rep = false;
    var count = 0;
    angular.module = function () {
        for (var k in modules) {
            if (modules[k] === arguments[0]) {
                rep = true;
                break;
            }
        }
        if (!rep) modules[count++] = arguments[0];

        return originalModule.apply(angular, arguments);
    };
})();