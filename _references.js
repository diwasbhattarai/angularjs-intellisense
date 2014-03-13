/// <reference path="../source/lib/assetBundle.js" />
/// <reference path="_moduleDecorator.js" />
/// <reference path="../source/app/<module declaration files>" />
/// <reference path="_componentDecorator.js" />
/// <reference path="../source/app/appBundle.js" />

intellisense.addEventListener('statementcompletion', function (event) {
    // for core angular objects
    addComponentToIntellisense('ng');
    // for custom objects in application modules
    for (var moduleIndex in modules) {
        addComponentToIntellisense(modules[moduleIndex]);
    }

    function addComponentToIntellisense(module) {
        var $injector = angular.injector(['ng', module]),
            dependency = $injector.get(event.targetName),
            dep;

        if (typeof dependency === "function") dep = new dependency();
        else dep = dependency;

        for (var method in dep) {
            event.items.push({ name: method, kind: 'field', value: dependency[method] });
        }
    }
});