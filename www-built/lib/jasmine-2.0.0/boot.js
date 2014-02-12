(function() {
    window.jasmine = jasmineRequire.core(jasmineRequire), jasmineRequire.html(jasmine);
    var env = jasmine.getEnv(), jasmineInterface = {
        describe: function(description, specDefinitions) {
            return env.describe(description, specDefinitions);
        },
        xdescribe: function(description, specDefinitions) {
            return env.xdescribe(description, specDefinitions);
        },
        it: function(desc, func) {
            return env.it(desc, func);
        },
        xit: function(desc, func) {
            return env.xit(desc, func);
        },
        beforeEach: function(beforeEachFunction) {
            return env.beforeEach(beforeEachFunction);
        },
        afterEach: function(afterEachFunction) {
            return env.afterEach(afterEachFunction);
        },
        expect: function(actual) {
            return env.expect(actual);
        },
        pending: function() {
            return env.pending();
        },
        spyOn: function(
obj, methodName) {
            return env.spyOn(obj, methodName);
        },
        jsApiReporter: new jasmine.JsApiReporter({
            timer: new jasmine.Timer
        })
    };
    typeof window == "undefined" && typeof exports == "object" ? extend(exports, jasmineInterface) : extend(window, jasmineInterface), jasmine.addCustomEqualityTester = function(tester) {
        env.addCustomEqualityTester(tester);
    }, jasmine.addMatchers = function(matchers) {
        return env.addMatchers(matchers);
    }, jasmine.clock = function() {
        return env.clock;
    };
    var queryString = new jasmine.QueryString({
        getWindowLocation: function() {
            return window.location;
        }
    }), catchingExceptions = queryString.getParam("catch");
    env.catchExceptions(typeof catchingExceptions == "undefined" ? !0 : catchingExceptions);
    var htmlReporter = new jasmine.HtmlReporter({
        env: env,
        onRaiseExceptionsClick: function() {
            queryString.
setParam("catch", !env.catchingExceptions());
        },
        getContainer: function() {
            return document.body;
        },
        createElement: function() {
            return document.createElement.apply(document, arguments);
        },
        createTextNode: function() {
            return document.createTextNode.apply(document, arguments);
        },
        timer: new jasmine.Timer
    });
    env.addReporter(jasmineInterface.jsApiReporter), env.addReporter(htmlReporter);
    var specFilter = new jasmine.HtmlSpecFilter({
        filterString: function() {
            return queryString.getParam("spec");
        }
    });
    env.specFilter = function(spec) {
        return specFilter.matches(spec.getFullName());
    }, window.setTimeout = window.setTimeout, window.setInterval = window.setInterval, window.clearTimeout = window.clearTimeout, window.clearInterval = window.clearInterval;
    var currentWindowOnload = window.onload;
    window.onload = function() {
        
currentWindowOnload && currentWindowOnload(), htmlReporter.initialize(), env.execute();
    };
    function extend(destination, source) {
        for (var property in source) destination[property] = source[property];
        return destination;
    }
})();;