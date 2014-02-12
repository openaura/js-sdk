/*
Copyright (c) 2008-2013 Pivotal Labs

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function getJasmineRequireObj() {
    return typeof module != "undefined" && module.exports ? exports : (window.jasmineRequire = window.jasmineRequire || {}, window.jasmineRequire);
}

getJasmineRequireObj().core = function(jRequire) {
    var j$ = {};
    return jRequire.base(j$), j$.util = jRequire.util(), j$.Any = jRequire.Any(), j$.CallTracker = jRequire.CallTracker(), j$.Clock = jRequire.Clock(), j$.DelayedFunctionScheduler = jRequire.DelayedFunctionScheduler(), j$.Env = jRequire.Env(j$), j$.ExceptionFormatter = jRequire.ExceptionFormatter(), j$.Expectation = jRequire.Expectation(), j$.buildExpectationResult = jRequire.buildExpectationResult(), j$.JsApiReporter = jRequire.JsApiReporter(), j$.matchersUtil = jRequire.matchersUtil(j$), j$.ObjectContaining = jRequire.ObjectContaining(j$), j$.pp = jRequire.pp(j$), j$.QueueRunner = jRequire.QueueRunner(), j$.ReportDispatcher = jRequire.ReportDispatcher(), j$.Spec = jRequire.Spec(j$), j$.SpyStrategy = jRequire.SpyStrategy(), j$.Suite = jRequire
.Suite(), j$.Timer = jRequire.Timer(), j$.version = jRequire.version(), j$.matchers = jRequire.requireMatchers(jRequire, j$), j$;
}, getJasmineRequireObj().requireMatchers = function(jRequire, j$) {
    var availableMatchers = [ "toBe", "toBeCloseTo", "toBeDefined", "toBeFalsy", "toBeGreaterThan", "toBeLessThan", "toBeNaN", "toBeNull", "toBeTruthy", "toBeUndefined", "toContain", "toEqual", "toHaveBeenCalled", "toHaveBeenCalledWith", "toMatch", "toThrow", "toThrowError" ], matchers = {};
    for (var i = 0; i < availableMatchers.length; i++) {
        var name = availableMatchers[i];
        matchers[name] = jRequire[name](j$);
    }
    return matchers;
}, getJasmineRequireObj().base = function(j$) {
    j$.unimplementedMethod_ = function() {
        throw new Error("unimplemented method");
    }, j$.MAX_PRETTY_PRINT_DEPTH = 40, j$.DEFAULT_TIMEOUT_INTERVAL = 5e3, j$.getGlobal = function() {
        var jasmineGlobal = eval.call(null, "this");
        return function() {
            return jasmineGlobal
;
        };
    }(), j$.getEnv = function(options) {
        var env = j$.currentEnv_ = j$.currentEnv_ || new j$.Env(options);
        return env;
    }, j$.isArray_ = function(value) {
        return j$.isA_("Array", value);
    }, j$.isString_ = function(value) {
        return j$.isA_("String", value);
    }, j$.isNumber_ = function(value) {
        return j$.isA_("Number", value);
    }, j$.isA_ = function(typeName, value) {
        return Object.prototype.toString.apply(value) === "[object " + typeName + "]";
    }, j$.isDomNode = function(obj) {
        return obj.nodeType > 0;
    }, j$.any = function(clazz) {
        return new j$.Any(clazz);
    }, j$.objectContaining = function(sample) {
        return new j$.ObjectContaining(sample);
    }, j$.createSpy = function(name, originalFn) {
        var spyStrategy = new j$.SpyStrategy({
            name: name,
            fn: originalFn,
            getSpy: function() {
                return spy;
            }
        }), callTracker = new 
j$.CallTracker, spy = function() {
            return callTracker.track({
                object: this,
                args: Array.prototype.slice.apply(arguments)
            }), spyStrategy.exec.apply(this, arguments);
        };
        for (var prop in originalFn) {
            if (prop === "and" || prop === "calls") throw new Error("Jasmine spies would overwrite the 'and' and 'calls' properties on the object being spied upon");
            spy[prop] = originalFn[prop];
        }
        return spy.and = spyStrategy, spy.calls = callTracker, spy;
    }, j$.isSpy = function(putativeSpy) {
        return putativeSpy ? putativeSpy.and instanceof j$.SpyStrategy && putativeSpy.calls instanceof j$.CallTracker : !1;
    }, j$.createSpyObj = function(baseName, methodNames) {
        if (!j$.isArray_(methodNames) || methodNames.length === 0) throw "createSpyObj requires a non-empty array of method names to create spies for";
        var obj = {};
        for (var i = 0; i < methodNames.length
; i++) obj[methodNames[i]] = j$.createSpy(baseName + "." + methodNames[i]);
        return obj;
    };
}, getJasmineRequireObj().util = function() {
    var util = {};
    return util.inherit = function(childClass, parentClass) {
        var Subclass = function() {};
        Subclass.prototype = parentClass.prototype, childClass.prototype = new Subclass;
    }, util.htmlEscape = function(str) {
        return str ? str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
    }, util.argsToArray = function(args) {
        var arrayOfArgs = [];
        for (var i = 0; i < args.length; i++) arrayOfArgs.push(args[i]);
        return arrayOfArgs;
    }, util.isUndefined = function(obj) {
        return obj === void 0;
    }, util;
}, getJasmineRequireObj().Spec = function(j$) {
    function Spec(attrs) {
        this.expectationFactory = attrs.expectationFactory, this.resultCallback = attrs.resultCallback || function() {}, this.id = attrs.id, this.description = attrs.description || ""
, this.fn = attrs.fn, this.beforeFns = attrs.beforeFns || function() {
            return [];
        }, this.afterFns = attrs.afterFns || function() {
            return [];
        }, this.onStart = attrs.onStart || function() {}, this.exceptionFormatter = attrs.exceptionFormatter || function() {}, this.getSpecName = attrs.getSpecName || function() {
            return "";
        }, this.expectationResultFactory = attrs.expectationResultFactory || function() {}, this.queueRunnerFactory = attrs.queueRunnerFactory || function() {}, this.catchingExceptions = attrs.catchingExceptions || function() {
            return !0;
        }, this.timer = attrs.timer || {
            setTimeout: setTimeout,
            clearTimeout: clearTimeout
        }, this.fn || this.pend(), this.result = {
            id: this.id,
            description: this.description,
            fullName: this.getFullName(),
            failedExpectations: []
        };
    }
    return Spec.prototype.addExpectationResult = 
function(passed, data) {
        if (passed) return;
        this.result.failedExpectations.push(this.expectationResultFactory(data));
    }, Spec.prototype.expect = function(actual) {
        return this.expectationFactory(actual, this);
    }, Spec.prototype.execute = function(onComplete) {
        var self = this, timeout;
        this.onStart(this);
        if (this.markedPending || this.disabled) {
            complete();
            return;
        }
        function timeoutable(fn) {
            return function(done) {
                timeout = Function.prototype.apply.apply(self.timer.setTimeout, [ j$.getGlobal(), [ function() {
                    onException(new Error("Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.")), done();
                }, j$.DEFAULT_TIMEOUT_INTERVAL ] ]);
                var callDone = function() {
                    clearTimeoutable(), done();
                };
                fn.call(this, callDone
);
            };
        }
        function clearTimeoutable() {
            Function.prototype.apply.apply(self.timer.clearTimeout, [ j$.getGlobal(), [ timeout ] ]), timeout = void 0;
        }
        var allFns = this.beforeFns().concat(this.fn).concat(this.afterFns()), allTimeoutableFns = [];
        for (var i = 0; i < allFns.length; i++) {
            var fn = allFns[i];
            allTimeoutableFns.push(fn.length > 0 ? timeoutable(fn) : fn);
        }
        this.queueRunnerFactory({
            fns: allTimeoutableFns,
            onException: onException,
            onComplete: complete
        });
        function onException(e) {
            clearTimeoutable();
            if (Spec.isPendingSpecException(e)) {
                self.pend();
                return;
            }
            self.addExpectationResult(!1, {
                matcherName: "",
                passed: !1,
                expected: "",
                actual: "",
                error: e
            
});
        }
        function complete() {
            self.result.status = self.status(), self.resultCallback(self.result), onComplete && onComplete();
        }
    }, Spec.prototype.disable = function() {
        this.disabled = !0;
    }, Spec.prototype.pend = function() {
        this.markedPending = !0;
    }, Spec.prototype.status = function() {
        return this.disabled ? "disabled" : this.markedPending ? "pending" : this.result.failedExpectations.length > 0 ? "failed" : "passed";
    }, Spec.prototype.getFullName = function() {
        return this.getSpecName(this);
    }, Spec.pendingSpecExceptionMessage = "=> marked Pending", Spec.isPendingSpecException = function(e) {
        return e.toString().indexOf(Spec.pendingSpecExceptionMessage) !== -1;
    }, Spec;
}, typeof window == void 0 && typeof exports == "object" && (exports.Spec = jasmineRequire.Spec), getJasmineRequireObj().Env = function(j$) {
    function Env(options) {
        options = options || {};
        var self = 
this, global = options.global || j$.getGlobal(), totalSpecsDefined = 0, catchExceptions = !0, realSetTimeout = j$.getGlobal().setTimeout, realClearTimeout = j$.getGlobal().clearTimeout;
        this.clock = new j$.Clock(global, new j$.DelayedFunctionScheduler);
        var runnableLookupTable = {}, spies = [], currentSpec = null, currentSuite = null, reporter = new j$.ReportDispatcher([ "jasmineStarted", "jasmineDone", "suiteStarted", "suiteDone", "specStarted", "specDone" ]);
        this.specFilter = function() {
            return !0;
        };
        var equalityTesters = [], customEqualityTesters = [];
        this.addCustomEqualityTester = function(tester) {
            customEqualityTesters.push(tester);
        }, j$.Expectation.addCoreMatchers(j$.matchers);
        var nextSpecId = 0, getNextSpecId = function() {
            return "spec" + nextSpecId++;
        }, nextSuiteId = 0, getNextSuiteId = function() {
            return "suite" + nextSuiteId++;
        }, expectationFactory = 
function(actual, spec) {
            return j$.Expectation.Factory({
                util: j$.matchersUtil,
                customEqualityTesters: customEqualityTesters,
                actual: actual,
                addExpectationResult: addExpectationResult
            });
            function addExpectationResult(passed, result) {
                return spec.addExpectationResult(passed, result);
            }
        }, specStarted = function(spec) {
            currentSpec = spec, reporter.specStarted(spec.result);
        }, beforeFns = function(suite) {
            return function() {
                var befores = [];
                while (suite) befores = befores.concat(suite.beforeFns), suite = suite.parentSuite;
                return befores.reverse();
            };
        }, afterFns = function(suite) {
            return function() {
                var afters = [];
                while (suite) afters = afters.concat(suite.afterFns), suite = suite.parentSuite;
                
return afters;
            };
        }, getSpecName = function(spec, suite) {
            return suite.getFullName() + " " + spec.description;
        }, buildExpectationResult = j$.buildExpectationResult, exceptionFormatter = new j$.ExceptionFormatter, expectationResultFactory = function(attrs) {
            return attrs.messageFormatter = exceptionFormatter.message, attrs.stackFormatter = exceptionFormatter.stack, buildExpectationResult(attrs);
        };
        this.catchExceptions = function(value) {
            return catchExceptions = !!value, catchExceptions;
        }, this.catchingExceptions = function() {
            return catchExceptions;
        };
        var maximumSpecCallbackDepth = 20, currentSpecCallbackDepth = 0;
        function clearStack(fn) {
            currentSpecCallbackDepth++, currentSpecCallbackDepth >= maximumSpecCallbackDepth ? (currentSpecCallbackDepth = 0, realSetTimeout(fn, 0)) : fn();
        }
        var catchException = function(e) {
            
return j$.Spec.isPendingSpecException(e) || catchExceptions;
        }, queueRunnerFactory = function(options) {
            options.catchException = catchException, options.clearStack = options.clearStack || clearStack, (new j$.QueueRunner(options)).execute();
        }, topSuite = new j$.Suite({
            env: this,
            id: getNextSuiteId(),
            description: "Jasmine__TopLevel__Suite",
            queueRunner: queueRunnerFactory,
            resultCallback: function() {}
        });
        runnableLookupTable[topSuite.id] = topSuite, currentSuite = topSuite, this.topSuite = function() {
            return topSuite;
        }, this.execute = function(runnablesToRun) {
            runnablesToRun = runnablesToRun || [ topSuite.id ];
            var allFns = [];
            for (var i = 0; i < runnablesToRun.length; i++) {
                var runnable = runnableLookupTable[runnablesToRun[i]];
                allFns.push(function(runnable) {
                    return function(
done) {
                        runnable.execute(done);
                    };
                }(runnable));
            }
            reporter.jasmineStarted({
                totalSpecsDefined: totalSpecsDefined
            }), queueRunnerFactory({
                fns: allFns,
                onComplete: reporter.jasmineDone
            });
        }, this.addReporter = function(reporterToAdd) {
            reporter.addReporter(reporterToAdd);
        }, this.addMatchers = function(matchersToAdd) {
            j$.Expectation.addMatchers(matchersToAdd);
        }, this.spyOn = function(obj, methodName) {
            if (j$.util.isUndefined(obj)) throw new Error("spyOn could not find an object to spy upon for " + methodName + "()");
            if (j$.util.isUndefined(obj[methodName])) throw new Error(methodName + "() method does not exist");
            if (obj[methodName] && j$.isSpy(obj[methodName])) throw new Error(methodName + " has already been spied upon");
            var spy = 
j$.createSpy(methodName, obj[methodName]);
            return spies.push({
                spy: spy,
                baseObj: obj,
                methodName: methodName,
                originalValue: obj[methodName]
            }), obj[methodName] = spy, spy;
        };
        var suiteFactory = function(description) {
            var suite = new j$.Suite({
                env: self,
                id: getNextSuiteId(),
                description: description,
                parentSuite: currentSuite,
                queueRunner: queueRunnerFactory,
                onStart: suiteStarted,
                resultCallback: function(attrs) {
                    reporter.suiteDone(attrs);
                }
            });
            return runnableLookupTable[suite.id] = suite, suite;
        };
        this.describe = function(description, specDefinitions) {
            var suite = suiteFactory(description), parentSuite = currentSuite;
            parentSuite.addChild(suite), currentSuite = 
suite;
            var declarationError = null;
            try {
                specDefinitions.call(suite);
            } catch (e) {
                declarationError = e;
            }
            return declarationError && this.it("encountered a declaration exception", function() {
                throw declarationError;
            }), currentSuite = parentSuite, suite;
        }, this.xdescribe = function(description, specDefinitions) {
            var suite = this.describe(description, specDefinitions);
            return suite.disable(), suite;
        };
        var specFactory = function(description, fn, suite) {
            totalSpecsDefined++;
            var spec = new j$.Spec({
                id: getNextSpecId(),
                beforeFns: beforeFns(suite),
                afterFns: afterFns(suite),
                expectationFactory: expectationFactory,
                exceptionFormatter: exceptionFormatter,
                resultCallback: specResultCallback,
                
getSpecName: function(spec) {
                    return getSpecName(spec, suite);
                },
                onStart: specStarted,
                description: description,
                expectationResultFactory: expectationResultFactory,
                queueRunnerFactory: queueRunnerFactory,
                fn: fn,
                timer: {
                    setTimeout: realSetTimeout,
                    clearTimeout: realClearTimeout
                }
            });
            runnableLookupTable[spec.id] = spec, self.specFilter(spec) || spec.disable();
            return spec;
            function removeAllSpies() {
                for (var i = 0; i < spies.length; i++) {
                    var spyEntry = spies[i];
                    spyEntry.baseObj[spyEntry.methodName] = spyEntry.originalValue;
                }
                spies = [];
            }
            function specResultCallback(result) {
                removeAllSpies(), j$.Expectation.resetMatchers
(), customEqualityTesters = [], currentSpec = null, reporter.specDone(result);
            }
        }, suiteStarted = function(suite) {
            reporter.suiteStarted(suite.result);
        };
        this.it = function(description, fn) {
            var spec = specFactory(description, fn, currentSuite);
            return currentSuite.addChild(spec), spec;
        }, this.xit = function(description, fn) {
            var spec = this.it(description, fn);
            return spec.pend(), spec;
        }, this.expect = function(actual) {
            return currentSpec.expect(actual);
        }, this.beforeEach = function(beforeEachFunction) {
            currentSuite.beforeEach(beforeEachFunction);
        }, this.afterEach = function(afterEachFunction) {
            currentSuite.afterEach(afterEachFunction);
        }, this.pending = function() {
            throw j$.Spec.pendingSpecExceptionMessage;
        };
    }
    return Env;
}, getJasmineRequireObj().JsApiReporter = function() 
{
    var noopTimer = {
        start: function() {},
        elapsed: function() {
            return 0;
        }
    };
    function JsApiReporter(options) {
        var timer = options.timer || noopTimer, status = "loaded";
        this.started = !1, this.finished = !1, this.jasmineStarted = function() {
            this.started = !0, status = "started", timer.start();
        };
        var executionTime;
        this.jasmineDone = function() {
            this.finished = !0, executionTime = timer.elapsed(), status = "done";
        }, this.status = function() {
            return status;
        };
        var suites = {};
        this.suiteStarted = function(result) {
            storeSuite(result);
        }, this.suiteDone = function(result) {
            storeSuite(result);
        };
        function storeSuite(result) {
            suites[result.id] = result;
        }
        this.suites = function() {
            return suites;
        };
        var specs = [];
        this
.specStarted = function(result) {}, this.specDone = function(result) {
            specs.push(result);
        }, this.specResults = function(index, length) {
            return specs.slice(index, index + length);
        }, this.specs = function() {
            return specs;
        }, this.executionTime = function() {
            return executionTime;
        };
    }
    return JsApiReporter;
}, getJasmineRequireObj().Any = function() {
    function Any(expectedObject) {
        this.expectedObject = expectedObject;
    }
    return Any.prototype.jasmineMatches = function(other) {
        return this.expectedObject == String ? typeof other == "string" || other instanceof String : this.expectedObject == Number ? typeof other == "number" || other instanceof Number : this.expectedObject == Function ? typeof other == "function" || other instanceof Function : this.expectedObject == Object ? typeof other == "object" : this.expectedObject == Boolean ? typeof other == "boolean" : other instanceof 
this.expectedObject;
    }, Any.prototype.jasmineToString = function() {
        return "<jasmine.any(" + this.expectedClass + ")>";
    }, Any;
}, getJasmineRequireObj().CallTracker = function() {
    function CallTracker() {
        var calls = [];
        this.track = function(context) {
            calls.push(context);
        }, this.any = function() {
            return !!calls.length;
        }, this.count = function() {
            return calls.length;
        }, this.argsFor = function(index) {
            var call = calls[index];
            return call ? call.args : [];
        }, this.all = function() {
            return calls;
        }, this.allArgs = function() {
            var callArgs = [];
            for (var i = 0; i < calls.length; i++) callArgs.push(calls[i].args);
            return callArgs;
        }, this.first = function() {
            return calls[0];
        }, this.mostRecent = function() {
            return calls[calls.length - 1];
        }, this.reset = 
function() {
            calls = [];
        };
    }
    return CallTracker;
}, getJasmineRequireObj().Clock = function() {
    function Clock(global, delayedFunctionScheduler) {
        var self = this, realTimingFunctions = {
            setTimeout: global.setTimeout,
            clearTimeout: global.clearTimeout,
            setInterval: global.setInterval,
            clearInterval: global.clearInterval
        }, fakeTimingFunctions = {
            setTimeout: setTimeout,
            clearTimeout: clearTimeout,
            setInterval: setInterval,
            clearInterval: clearInterval
        }, installed = !1, timer;
        self.install = function() {
            replace(global, fakeTimingFunctions), timer = fakeTimingFunctions, installed = !0;
        }, self.uninstall = function() {
            delayedFunctionScheduler.reset(), replace(global, realTimingFunctions), timer = realTimingFunctions, installed = !1;
        }, self.setTimeout = function(fn, delay, params) {
            
if (legacyIE()) {
                if (arguments.length > 2) throw new Error("IE < 9 cannot support extra params to setTimeout without a polyfill");
                return timer.setTimeout(fn, delay);
            }
            return Function.prototype.apply.apply(timer.setTimeout, [ global, arguments ]);
        }, self.setInterval = function(fn, delay, params) {
            if (legacyIE()) {
                if (arguments.length > 2) throw new Error("IE < 9 cannot support extra params to setInterval without a polyfill");
                return timer.setInterval(fn, delay);
            }
            return Function.prototype.apply.apply(timer.setInterval, [ global, arguments ]);
        }, self.clearTimeout = function(id) {
            return Function.prototype.call.apply(timer.clearTimeout, [ global, id ]);
        }, self.clearInterval = function(id) {
            return Function.prototype.call.apply(timer.clearInterval, [ global, id ]);
        }, self.tick = function(millis) {
            
if (!installed) throw new Error("Mock clock is not installed, use jasmine.clock().install()");
            delayedFunctionScheduler.tick(millis);
        };
        return self;
        function legacyIE() {
            return !(realTimingFunctions.setTimeout || realTimingFunctions.setInterval).apply;
        }
        function replace(dest, source) {
            for (var prop in source) dest[prop] = source[prop];
        }
        function setTimeout(fn, delay) {
            return delayedFunctionScheduler.scheduleFunction(fn, delay, argSlice(arguments, 2));
        }
        function clearTimeout(id) {
            return delayedFunctionScheduler.removeFunctionWithId(id);
        }
        function setInterval(fn, interval) {
            return delayedFunctionScheduler.scheduleFunction(fn, interval, argSlice(arguments, 2), !0);
        }
        function clearInterval(id) {
            return delayedFunctionScheduler.removeFunctionWithId(id);
        }
        function argSlice(argsObj
, n) {
            return Array.prototype.slice.call(argsObj, 2);
        }
    }
    return Clock;
}, getJasmineRequireObj().DelayedFunctionScheduler = function() {
    function DelayedFunctionScheduler() {
        var self = this, scheduledLookup = [], scheduledFunctions = {}, currentTime = 0, delayedFnCount = 0;
        self.tick = function(millis) {
            millis = millis || 0;
            var endTime = currentTime + millis;
            runScheduledFunctions(endTime), currentTime = endTime;
        }, self.scheduleFunction = function(funcToCall, millis, params, recurring, timeoutKey, runAtMillis) {
            var f;
            typeof funcToCall == "string" ? f = function() {
                return eval(funcToCall);
            } : f = funcToCall, millis = millis || 0, timeoutKey = timeoutKey || ++delayedFnCount, runAtMillis = runAtMillis || currentTime + millis;
            var funcToSchedule = {
                runAtMillis: runAtMillis,
                funcToCall: f,
                
recurring: recurring,
                params: params,
                timeoutKey: timeoutKey,
                millis: millis
            };
            return runAtMillis in scheduledFunctions ? scheduledFunctions[runAtMillis].push(funcToSchedule) : (scheduledFunctions[runAtMillis] = [ funcToSchedule ], scheduledLookup.push(runAtMillis), scheduledLookup.sort(function(a, b) {
                return a - b;
            })), timeoutKey;
        }, self.removeFunctionWithId = function(timeoutKey) {
            for (var runAtMillis in scheduledFunctions) {
                var funcs = scheduledFunctions[runAtMillis], i = indexOfFirstToPass(funcs, function(func) {
                    return func.timeoutKey === timeoutKey;
                });
                if (i > -1) {
                    funcs.length === 1 ? (delete scheduledFunctions[runAtMillis], deleteFromLookup(runAtMillis)) : funcs.splice(i, 1);
                    break;
                }
            }
        }, self.reset = function(
) {
            currentTime = 0, scheduledLookup = [], scheduledFunctions = {}, delayedFnCount = 0;
        };
        return self;
        function indexOfFirstToPass(array, testFn) {
            var index = -1;
            for (var i = 0; i < array.length; ++i) if (testFn(array[i])) {
                index = i;
                break;
            }
            return index;
        }
        function deleteFromLookup(key) {
            var value = Number(key), i = indexOfFirstToPass(scheduledLookup, function(millis) {
                return millis === value;
            });
            i > -1 && scheduledLookup.splice(i, 1);
        }
        function reschedule(scheduledFn) {
            self.scheduleFunction(scheduledFn.funcToCall, scheduledFn.millis, scheduledFn.params, !0, scheduledFn.timeoutKey, scheduledFn.runAtMillis + scheduledFn.millis);
        }
        function runScheduledFunctions(endTime) {
            if (scheduledLookup.length === 0 || scheduledLookup[0] > endTime) return;
            
do {
                currentTime = scheduledLookup.shift();
                var funcsToRun = scheduledFunctions[currentTime];
                delete scheduledFunctions[currentTime];
                for (var i = 0; i < funcsToRun.length; ++i) {
                    var funcToRun = funcsToRun[i];
                    funcToRun.funcToCall.apply(null, funcToRun.params || []), funcToRun.recurring && reschedule(funcToRun);
                }
            } while (scheduledLookup.length > 0 && currentTime !== endTime && scheduledLookup[0] <= endTime);
        }
    }
    return DelayedFunctionScheduler;
}, getJasmineRequireObj().ExceptionFormatter = function() {
    function ExceptionFormatter() {
        this.message = function(error) {
            var message = error.name + ": " + error.message;
            if (error.fileName || error.sourceURL) message += " in " + (error.fileName || error.sourceURL);
            if (error.line || error.lineNumber) message += " (line " + (error.line || error.lineNumber
) + ")";
            return message;
        }, this.stack = function(error) {
            return error ? error.stack : null;
        };
    }
    return ExceptionFormatter;
}, getJasmineRequireObj().Expectation = function() {
    var matchers = {};
    function Expectation(options) {
        this.util = options.util || {
            buildFailureMessage: function() {}
        }, this.customEqualityTesters = options.customEqualityTesters || [], this.actual = options.actual, this.addExpectationResult = options.addExpectationResult || function() {}, this.isNot = options.isNot;
        for (var matcherName in matchers) this[matcherName] = matchers[matcherName];
    }
    return Expectation.prototype.wrapCompare = function(name, matcherFactory) {
        return function() {
            var args = Array.prototype.slice.call(arguments, 0), expected = args.slice(0), message = "";
            args.unshift(this.actual);
            var matcher = matcherFactory(this.util, this.customEqualityTesters
), matcherCompare = matcher.compare;
            function defaultNegativeCompare() {
                var result = matcher.compare.apply(null, args);
                return result.pass = !result.pass, result;
            }
            this.isNot && (matcherCompare = matcher.negativeCompare || defaultNegativeCompare);
            var result = matcherCompare.apply(null, args);
            result.pass || (result.message ? message = result.message : (args.unshift(this.isNot), args.unshift(name), message = this.util.buildFailureMessage.apply(null, args))), expected.length == 1 && (expected = expected[0]), this.addExpectationResult(result.pass, {
                matcherName: name,
                passed: result.pass,
                message: message,
                actual: this.actual,
                expected: expected
            });
        };
    }, Expectation.addCoreMatchers = function(matchers) {
        var prototype = Expectation.prototype;
        for (var matcherName in matchers) {
            
var matcher = matchers[matcherName];
            prototype[matcherName] = prototype.wrapCompare(matcherName, matcher);
        }
    }, Expectation.addMatchers = function(matchersToAdd) {
        for (var name in matchersToAdd) {
            var matcher = matchersToAdd[name];
            matchers[name] = Expectation.prototype.wrapCompare(name, matcher);
        }
    }, Expectation.resetMatchers = function() {
        for (var name in matchers) delete matchers[name];
    }, Expectation.Factory = function(options) {
        options = options || {};
        var expect = new Expectation(options);
        return options.isNot = !0, expect.not = new Expectation(options), expect;
    }, Expectation;
}, getJasmineRequireObj().buildExpectationResult = function() {
    function buildExpectationResult(options) {
        var messageFormatter = options.messageFormatter || function() {}, stackFormatter = options.stackFormatter || function() {};
        return {
            matcherName: options.matcherName
,
            expected: options.expected,
            actual: options.actual,
            message: message(),
            stack: stack(),
            passed: options.passed
        };
        function message() {
            return options.passed ? "Passed." : options.message ? options.message : options.error ? messageFormatter(options.error) : "";
        }
        function stack() {
            if (options.passed) return "";
            var error = options.error;
            if (!error) try {
                throw new Error(message());
            } catch (e) {
                error = e;
            }
            return stackFormatter(error);
        }
    }
    return buildExpectationResult;
}, getJasmineRequireObj().ObjectContaining = function(j$) {
    function ObjectContaining(sample) {
        this.sample = sample;
    }
    return ObjectContaining.prototype.jasmineMatches = function(other, mismatchKeys, mismatchValues) {
        if (typeof this.sample != "object") throw new Error
("You must provide an object to objectContaining, not '" + this.sample + "'.");
        mismatchKeys = mismatchKeys || [], mismatchValues = mismatchValues || [];
        var hasKey = function(obj, keyName) {
            return obj !== null && !j$.util.isUndefined(obj[keyName]);
        };
        for (var property in this.sample) !hasKey(other, property) && hasKey(this.sample, property) ? mismatchKeys.push("expected has key '" + property + "', but missing from actual.") : j$.matchersUtil.equals(this.sample[property], other[property]) || mismatchValues.push("'" + property + "' was '" + (other[property] ? j$.util.htmlEscape(other[property].toString()) : other[property]) + "' in actual, but was '" + (this.sample[property] ? j$.util.htmlEscape(this.sample[property].toString()) : this.sample[property]) + "' in expected.");
        return mismatchKeys.length === 0 && mismatchValues.length === 0;
    }, ObjectContaining.prototype.jasmineToString = function() {
        return "<jasmine.objectContaining(" + 
j$.pp(this.sample) + ")>";
    }, ObjectContaining;
}, getJasmineRequireObj().pp = function(j$) {
    function PrettyPrinter() {
        this.ppNestLevel_ = 0;
    }
    PrettyPrinter.prototype.format = function(value) {
        this.ppNestLevel_++;
        try {
            j$.util.isUndefined(value) ? this.emitScalar("undefined") : value === null ? this.emitScalar("null") : value === j$.getGlobal() ? this.emitScalar("<global>") : value.jasmineToString ? this.emitScalar(value.jasmineToString()) : typeof value == "string" ? this.emitString(value) : j$.isSpy(value) ? this.emitScalar("spy on " + value.and.identity()) : value instanceof RegExp ? this.emitScalar(value.toString()) : typeof value == "function" ? this.emitScalar("Function") : typeof value.nodeType == "number" ? this.emitScalar("HTMLNode") : value instanceof Date ? this.emitScalar("Date(" + value + ")") : value.__Jasmine_been_here_before__ ? this.emitScalar("<circular reference: " + (j$.isArray_(value) ? "Array" : "Object") + ">"
) : j$.isArray_(value) || j$.isA_("Object", value) ? (value.__Jasmine_been_here_before__ = !0, j$.isArray_(value) ? this.emitArray(value) : this.emitObject(value), delete value.__Jasmine_been_here_before__) : this.emitScalar(value.toString());
        } finally {
            this.ppNestLevel_--;
        }
    }, PrettyPrinter.prototype.iterateObject = function(obj, fn) {
        for (var property in obj) {
            if (!obj.hasOwnProperty(property)) continue;
            if (property == "__Jasmine_been_here_before__") continue;
            fn(property, obj.__lookupGetter__ ? !j$.util.isUndefined(obj.__lookupGetter__(property)) && obj.__lookupGetter__(property) !== null : !1);
        }
    }, PrettyPrinter.prototype.emitArray = j$.unimplementedMethod_, PrettyPrinter.prototype.emitObject = j$.unimplementedMethod_, PrettyPrinter.prototype.emitScalar = j$.unimplementedMethod_, PrettyPrinter.prototype.emitString = j$.unimplementedMethod_;
    function StringPrettyPrinter() {
        PrettyPrinter
.call(this), this.string = "";
    }
    return j$.util.inherit(StringPrettyPrinter, PrettyPrinter), StringPrettyPrinter.prototype.emitScalar = function(value) {
        this.append(value);
    }, StringPrettyPrinter.prototype.emitString = function(value) {
        this.append("'" + value + "'");
    }, StringPrettyPrinter.prototype.emitArray = function(array) {
        if (this.ppNestLevel_ > j$.MAX_PRETTY_PRINT_DEPTH) {
            this.append("Array");
            return;
        }
        this.append("[ ");
        for (var i = 0; i < array.length; i++) i > 0 && this.append(", "), this.format(array[i]);
        this.append(" ]");
    }, StringPrettyPrinter.prototype.emitObject = function(obj) {
        if (this.ppNestLevel_ > j$.MAX_PRETTY_PRINT_DEPTH) {
            this.append("Object");
            return;
        }
        var self = this;
        this.append("{ ");
        var first = !0;
        this.iterateObject(obj, function(property, isGetter) {
            first ? first = !1 
: self.append(", "), self.append(property), self.append(" : "), isGetter ? self.append("<getter>") : self.format(obj[property]);
        }), this.append(" }");
    }, StringPrettyPrinter.prototype.append = function(value) {
        this.string += value;
    }, function(value) {
        var stringPrettyPrinter = new StringPrettyPrinter;
        return stringPrettyPrinter.format(value), stringPrettyPrinter.string;
    };
}, getJasmineRequireObj().QueueRunner = function() {
    function QueueRunner(attrs) {
        this.fns = attrs.fns || [], this.onComplete = attrs.onComplete || function() {}, this.clearStack = attrs.clearStack || function(fn) {
            fn();
        }, this.onException = attrs.onException || function() {}, this.catchException = attrs.catchException || function() {
            return !0;
        }, this.userContext = {};
    }
    return QueueRunner.prototype.execute = function() {
        this.run(this.fns, 0);
    }, QueueRunner.prototype.run = function(fns, recursiveIndex
) {
        var length = fns.length, self = this, iterativeIndex;
        for (iterativeIndex = recursiveIndex; iterativeIndex < length; iterativeIndex++) {
            var fn = fns[iterativeIndex];
            if (fn.length > 0) return attemptAsync(fn);
            attemptSync(fn);
        }
        var runnerDone = iterativeIndex >= length;
        runnerDone && this.clearStack(this.onComplete);
        function attemptSync(fn) {
            try {
                fn.call(self.userContext);
            } catch (e) {
                handleException(e);
            }
        }
        function attemptAsync(fn) {
            var next = function() {
                self.run(fns, iterativeIndex + 1);
            };
            try {
                fn.call(self.userContext, next);
            } catch (e) {
                handleException(e), next();
            }
        }
        function handleException(e) {
            self.onException(e);
            if (!self.catchException(e)) throw e
;
        }
    }, QueueRunner;
}, getJasmineRequireObj().ReportDispatcher = function() {
    function ReportDispatcher(methods) {
        var dispatchedMethods = methods || [];
        for (var i = 0; i < dispatchedMethods.length; i++) {
            var method = dispatchedMethods[i];
            this[method] = function(m) {
                return function() {
                    dispatch(m, arguments);
                };
            }(method);
        }
        var reporters = [];
        this.addReporter = function(reporter) {
            reporters.push(reporter);
        };
        return this;
        function dispatch(method, args) {
            for (var i = 0; i < reporters.length; i++) {
                var reporter = reporters[i];
                reporter[method] && reporter[method].apply(reporter, args);
            }
        }
    }
    return ReportDispatcher;
}, getJasmineRequireObj().SpyStrategy = function() {
    function SpyStrategy(options) {
        options = options || 
{};
        var identity = options.name || "unknown", originalFn = options.fn || function() {}, getSpy = options.getSpy || function() {}, plan = function() {};
        this.identity = function() {
            return identity;
        }, this.exec = function() {
            return plan.apply(this, arguments);
        }, this.callThrough = function() {
            return plan = originalFn, getSpy();
        }, this.returnValue = function(value) {
            return plan = function() {
                return value;
            }, getSpy();
        }, this.throwError = function(something) {
            var error = something instanceof Error ? something : new Error(something);
            return plan = function() {
                throw error;
            }, getSpy();
        }, this.callFake = function(fn) {
            return plan = fn, getSpy();
        }, this.stub = function(fn) {
            return plan = function() {}, getSpy();
        };
    }
    return SpyStrategy;
}, getJasmineRequireObj
().Suite = function() {
    function Suite(attrs) {
        this.env = attrs.env, this.id = attrs.id, this.parentSuite = attrs.parentSuite, this.description = attrs.description, this.onStart = attrs.onStart || function() {}, this.resultCallback = attrs.resultCallback || function() {}, this.clearStack = attrs.clearStack || function(fn) {
            fn();
        }, this.beforeFns = [], this.afterFns = [], this.queueRunner = attrs.queueRunner || function() {}, this.disabled = !1, this.children = [], this.result = {
            id: this.id,
            status: this.disabled ? "disabled" : "",
            description: this.description,
            fullName: this.getFullName()
        };
    }
    return Suite.prototype.getFullName = function() {
        var fullName = this.description;
        for (var parentSuite = this.parentSuite; parentSuite; parentSuite = parentSuite.parentSuite) parentSuite.parentSuite && (fullName = parentSuite.description + " " + fullName);
        return fullName;
    
}, Suite.prototype.disable = function() {
        this.disabled = !0;
    }, Suite.prototype.beforeEach = function(fn) {
        this.beforeFns.unshift(fn);
    }, Suite.prototype.afterEach = function(fn) {
        this.afterFns.unshift(fn);
    }, Suite.prototype.addChild = function(child) {
        this.children.push(child);
    }, Suite.prototype.execute = function(onComplete) {
        var self = this;
        if (this.disabled) {
            complete();
            return;
        }
        var allFns = [];
        for (var i = 0; i < this.children.length; i++) allFns.push(wrapChildAsAsync(this.children[i]));
        this.onStart(this), this.queueRunner({
            fns: allFns,
            onComplete: complete
        });
        function complete() {
            self.resultCallback(self.result), onComplete && onComplete();
        }
        function wrapChildAsAsync(child) {
            return function(done) {
                child.execute(done);
            };
        }
    }, 
Suite;
}, typeof window == void 0 && typeof exports == "object" && (exports.Suite = jasmineRequire.Suite), getJasmineRequireObj().Timer = function() {
    function Timer(options) {
        options = options || {};
        var now = options.now || function() {
            return (new Date).getTime();
        }, startTime;
        this.start = function() {
            startTime = now();
        }, this.elapsed = function() {
            return now() - startTime;
        };
    }
    return Timer;
}, getJasmineRequireObj().matchersUtil = function(j$) {
    return {
        equals: function(a, b, customTesters) {
            return customTesters = customTesters || [], eq(a, b, [], [], customTesters);
        },
        contains: function(haystack, needle, customTesters) {
            customTesters = customTesters || [];
            if (Object.prototype.toString.apply(haystack) === "[object Array]") {
                for (var i = 0; i < haystack.length; i++) if (eq(haystack[i], needle, [], [
], customTesters)) return !0;
                return !1;
            }
            return haystack.indexOf(needle) >= 0;
        },
        buildFailureMessage: function() {
            var args = Array.prototype.slice.call(arguments, 0), matcherName = args[0], isNot = args[1], actual = args[2], expected = args.slice(3), englishyPredicate = matcherName.replace(/[A-Z]/g, function(s) {
                return " " + s.toLowerCase();
            }), message = "Expected " + j$.pp(actual) + (isNot ? " not " : " ") + englishyPredicate;
            if (expected.length > 0) for (var i = 0; i < expected.length; i++) i > 0 && (message += ","), message += " " + j$.pp(expected[i]);
            return message + ".";
        }
    };
    function eq(a, b, aStack, bStack, customTesters) {
        var result = !0;
        for (var i = 0; i < customTesters.length; i++) {
            var customTesterResult = customTesters[i](a, b);
            if (!j$.util.isUndefined(customTesterResult)) return customTesterResult
;
        }
        if (a instanceof j$.Any) {
            result = a.jasmineMatches(b);
            if (result) return !0;
        }
        if (b instanceof j$.Any) {
            result = b.jasmineMatches(a);
            if (result) return !0;
        }
        if (b instanceof j$.ObjectContaining) {
            result = b.jasmineMatches(a);
            if (result) return !0;
        }
        if (a instanceof Error && b instanceof Error) return a.message == b.message;
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        if (a === null || b === null) return a === b;
        var className = Object.prototype.toString.call(a);
        if (className != Object.prototype.toString.call(b)) return !1;
        switch (className) {
          case "[object String]":
            return a == String(b);
          case "[object Number]":
            return a != +a ? b != +b : a === 0 ? 1 / a == 1 / b : a == +b;
          case "[object Date]":
          case "[object Boolean]":
            
return +a == +b;
          case "[object RegExp]":
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != "object" || typeof b != "object") return !1;
        var length = aStack.length;
        while (length--) if (aStack[length] == a) return bStack[length] == b;
        aStack.push(a), bStack.push(b);
        var size = 0;
        if (className == "[object Array]") {
            size = a.length, result = size == b.length;
            if (result) while (size--) if (!(result = eq(a[size], b[size], aStack, bStack, customTesters))) break;
        } else {
            var aCtor = a.constructor, bCtor = b.constructor;
            if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor)) return !1;
            for (var key in a) if (has(a, key)) {
                size++;
                if (!(result = has(b, key) && eq(a[key], b
[key], aStack, bStack, customTesters))) break;
            }
            if (result) {
                for (key in b) if (has(b, key) && !(size--)) break;
                result = !size;
            }
        }
        aStack.pop(), bStack.pop();
        return result;
        function has(obj, key) {
            return obj.hasOwnProperty(key);
        }
        function isFunction(obj) {
            return typeof obj == "function";
        }
    }
}, getJasmineRequireObj().toBe = function() {
    function toBe() {
        return {
            compare: function(actual, expected) {
                return {
                    pass: actual === expected
                };
            }
        };
    }
    return toBe;
}, getJasmineRequireObj().toBeCloseTo = function() {
    function toBeCloseTo() {
        return {
            compare: function(actual, expected, precision) {
                return precision !== 0 && (precision = precision || 2), {
                    pass: Math.abs(expected - 
actual) < Math.pow(10, -precision) / 2
                };
            }
        };
    }
    return toBeCloseTo;
}, getJasmineRequireObj().toBeDefined = function() {
    function toBeDefined() {
        return {
            compare: function(actual) {
                return {
                    pass: void 0 !== actual
                };
            }
        };
    }
    return toBeDefined;
}, getJasmineRequireObj().toBeFalsy = function() {
    function toBeFalsy() {
        return {
            compare: function(actual) {
                return {
                    pass: !actual
                };
            }
        };
    }
    return toBeFalsy;
}, getJasmineRequireObj().toBeGreaterThan = function() {
    function toBeGreaterThan() {
        return {
            compare: function(actual, expected) {
                return {
                    pass: actual > expected
                };
            }
        };
    }
    return toBeGreaterThan;
}, getJasmineRequireObj().toBeLessThan = 
function() {
    function toBeLessThan() {
        return {
            compare: function(actual, expected) {
                return {
                    pass: actual < expected
                };
            }
        };
    }
    return toBeLessThan;
}, getJasmineRequireObj().toBeNaN = function(j$) {
    function toBeNaN() {
        return {
            compare: function(actual) {
                var result = {
                    pass: actual !== actual
                };
                return result.pass ? result.message = "Expected actual not to be NaN." : result.message = "Expected " + j$.pp(actual) + " to be NaN.", result;
            }
        };
    }
    return toBeNaN;
}, getJasmineRequireObj().toBeNull = function() {
    function toBeNull() {
        return {
            compare: function(actual) {
                return {
                    pass: actual === null
                };
            }
        };
    }
    return toBeNull;
}, getJasmineRequireObj().toBeTruthy = 
function() {
    function toBeTruthy() {
        return {
            compare: function(actual) {
                return {
                    pass: !!actual
                };
            }
        };
    }
    return toBeTruthy;
}, getJasmineRequireObj().toBeUndefined = function() {
    function toBeUndefined() {
        return {
            compare: function(actual) {
                return {
                    pass: void 0 === actual
                };
            }
        };
    }
    return toBeUndefined;
}, getJasmineRequireObj().toContain = function() {
    function toContain(util, customEqualityTesters) {
        return customEqualityTesters = customEqualityTesters || [], {
            compare: function(actual, expected) {
                return {
                    pass: util.contains(actual, expected, customEqualityTesters)
                };
            }
        };
    }
    return toContain;
}, getJasmineRequireObj().toEqual = function() {
    function toEqual(util, customEqualityTesters
) {
        return customEqualityTesters = customEqualityTesters || [], {
            compare: function(actual, expected) {
                var result = {
                    pass: !1
                };
                return result.pass = util.equals(actual, expected, customEqualityTesters), result;
            }
        };
    }
    return toEqual;
}, getJasmineRequireObj().toHaveBeenCalled = function(j$) {
    function toHaveBeenCalled() {
        return {
            compare: function(actual) {
                var result = {};
                if (!j$.isSpy(actual)) throw new Error("Expected a spy, but got " + j$.pp(actual) + ".");
                if (arguments.length > 1) throw new Error("toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith");
                return result.pass = actual.calls.any(), result.message = result.pass ? "Expected spy " + actual.and.identity() + " not to have been called." : "Expected spy " + actual.and.identity() + " to have been called.", result
;
            }
        };
    }
    return toHaveBeenCalled;
}, getJasmineRequireObj().toHaveBeenCalledWith = function(j$) {
    function toHaveBeenCalledWith(util) {
        return {
            compare: function() {
                var args = Array.prototype.slice.call(arguments, 0), actual = args[0], expectedArgs = args.slice(1), result = {
                    pass: !1
                };
                if (!j$.isSpy(actual)) throw new Error("Expected a spy, but got " + j$.pp(actual) + ".");
                return actual.calls.any() ? (util.contains(actual.calls.allArgs(), expectedArgs) ? (result.pass = !0, result.message = "Expected spy " + actual.and.identity() + " not to have been called with " + j$.pp(expectedArgs) + " but it was.") : result.message = "Expected spy " + actual.and.identity() + " to have been called with " + j$.pp(expectedArgs) + " but actual calls were " + j$.pp(actual.calls.allArgs()).replace(/^\[ | \]$/g, "") + ".", result) : (result.message = "Expected spy " + 
actual.and.identity() + " to have been called with " + j$.pp(expectedArgs) + " but it was never called.", result);
            }
        };
    }
    return toHaveBeenCalledWith;
}, getJasmineRequireObj().toMatch = function() {
    function toMatch() {
        return {
            compare: function(actual, expected) {
                var regexp = new RegExp(expected);
                return {
                    pass: regexp.test(actual)
                };
            }
        };
    }
    return toMatch;
}, getJasmineRequireObj().toThrow = function(j$) {
    function toThrow(util) {
        return {
            compare: function(actual, expected) {
                var result = {
                    pass: !1
                }, threw = !1, thrown;
                if (typeof actual != "function") throw new Error("Actual is not a Function");
                try {
                    actual();
                } catch (e) {
                    threw = !0, thrown = e;
                }
                
return threw ? arguments.length == 1 ? (result.pass = !0, result.message = "Expected function not to throw, but it threw " + j$.pp(thrown) + ".", result) : (util.equals(thrown, expected) ? (result.pass = !0, result.message = "Expected function not to throw " + j$.pp(expected) + ".") : result.message = "Expected function to throw " + j$.pp(expected) + ", but it threw " + j$.pp(thrown) + ".", result) : (result.message = "Expected function to throw an exception.", result);
            }
        };
    }
    return toThrow;
}, getJasmineRequireObj().toThrowError = function(j$) {
    function toThrowError(util) {
        return {
            compare: function(actual) {
                var threw = !1, thrown, errorType, message, regexp, name, constructorName;
                if (typeof actual != "function") throw new Error("Actual is not a Function");
                extractExpectedParams.apply(null, arguments);
                try {
                    actual();
                } catch (e) {
                    
threw = !0, thrown = e;
                }
                if (!threw) return fail("Expected function to throw an Error.");
                if (!(thrown instanceof Error)) return fail("Expected function to throw an Error, but it threw " + thrown + ".");
                if (arguments.length == 1) return pass("Expected function not to throw an Error, but it threw " + fnNameFor(thrown) + ".");
                errorType && (name = fnNameFor(errorType), constructorName = fnNameFor(thrown.constructor));
                if (errorType && message) return thrown.constructor == errorType && util.equals(thrown.message, message) ? pass("Expected function not to throw " + name + ' with message "' + message + '".') : fail("Expected function to throw " + name + ' with message "' + message + '", but it threw ' + constructorName + ' with message "' + thrown.message + '".');
                if (errorType && regexp) return thrown.constructor == errorType && regexp.test(thrown.message) ? pass("Expected function not to throw " + 
name + " with message matching " + regexp + ".") : fail("Expected function to throw " + name + " with message matching " + regexp + ", but it threw " + constructorName + ' with message "' + thrown.message + '".');
                if (errorType) return thrown.constructor == errorType ? pass("Expected function not to throw " + name + ".") : fail("Expected function to throw " + name + ", but it threw " + constructorName + ".");
                if (message) return thrown.message == message ? pass("Expected function not to throw an exception with message " + j$.pp(message) + ".") : fail("Expected function to throw an exception with message " + j$.pp(message) + ", but it threw an exception with message " + j$.pp(thrown.message) + ".");
                if (regexp) return regexp.test(thrown.message) ? pass("Expected function not to throw an exception with a message matching " + j$.pp(regexp) + ".") : fail("Expected function to throw an exception with a message matching " + j$.pp(regexp) + ", but it threw an exception with message " + 
j$.pp(thrown.message) + ".");
                function fnNameFor(func) {
                    return func.name || func.toString().match(/^\s*function\s*(\w*)\s*\(/)[1];
                }
                function pass(notMessage) {
                    return {
                        pass: !0,
                        message: notMessage
                    };
                }
                function fail(message) {
                    return {
                        pass: !1,
                        message: message
                    };
                }
                function extractExpectedParams() {
                    if (arguments.length == 1) return;
                    if (arguments.length == 2) {
                        var expected = arguments[1];
                        expected instanceof RegExp ? regexp = expected : typeof expected == "string" ? message = expected : checkForAnErrorType(expected) && (errorType = expected);
                        if (!(errorType || message || 
regexp)) throw new Error("Expected is not an Error, string, or RegExp.");
                    } else {
                        if (!checkForAnErrorType(arguments[1])) throw new Error("Expected error type is not an Error.");
                        errorType = arguments[1];
                        if (arguments[2] instanceof RegExp) regexp = arguments[2]; else {
                            if (typeof arguments[2] != "string") throw new Error("Expected error message is not a string or RegExp.");
                            message = arguments[2];
                        }
                    }
                }
                function checkForAnErrorType(type) {
                    if (typeof type != "function") return !1;
                    var Surrogate = function() {};
                    return Surrogate.prototype = type.prototype, new Surrogate instanceof Error;
                }
            }
        };
    }
    return toThrowError;
}, getJasmineRequireObj().version = function() 
{
    return "2.0.0";
};;