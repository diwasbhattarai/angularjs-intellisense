 (function () {
    // pick all the components in all modules and initialize them for intellisense
    for (var moduleIndex in modules) {
        var currentModule = angular.module(modules[moduleIndex]),
            queue = currentModule._invokeQueue,
            // add other components such as value, provider, etc later
            angularComponents = ['controller', 'factory', 'service', 'value'];

        for (var i = 0; i < angularComponents.length; i++) {
            var currentComponent    = angularComponents[i],
                originalComponentFn = currentModule[currentComponent];

            currentModule[currentComponent] = (function (currentModule, queue, originalComponentFn) {
                return function () {
                    originalComponentFn.apply(currentModule, arguments);
                    initializeComponents(queue);
                };
            })(currentModule, queue, originalComponentFn);
        }
    }

    function initializeComponents(queue) {
        var elem = queue.filter(function (element) {
            var componentName = element[2][0].toLowerCase();
            return (componentName.indexOf(componentName) !== -1);
        });

        for (var i = 0; i < elem.length; i++) {
            var tempComp = elem[i][2][1],
                compFunc;

            // for array notation for DI
            if (typeof tempComp !== "function") {
                compFunc = tempComp[tempComp.length - 1];
            } else {
                compFunc = tempComp;
            }

            // 10 parameter dependencies initialization for now
            compFunc({}, {}, {}, {}, {}, {}, {}, {}, {}, {});
        }
    }
})();