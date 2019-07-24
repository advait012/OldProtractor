var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = {
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true,
    };

    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.specLevel = function (str) {
        var arr = str.split('|');
        str = "";
        if (arr.length < 3) {
            return true;
        }
        return false;
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };


    this.nToBr = function (str) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    };


    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number)/1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {passCount++};
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {pendingCount++};
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {failCount++}
        }
        return failCount;
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results =[
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14184,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e90044-007f-0026-00f9-00c500d40086.png",
        "timestamp": 1532271576464,
        "duration": 2587
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11756,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a800bb-00f8-00e1-00c3-006b001900f0.png",
        "timestamp": 1532273983809,
        "duration": 3545
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8620,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c300cd-00f0-000c-0056-006400c80026.png",
        "timestamp": 1532274013660,
        "duration": 3108
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15324,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008c0003-0069-00e0-00a9-00f800fd0029.png",
        "timestamp": 1532274109099,
        "duration": 2152
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15644,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009b0056-002e-0027-00be-001900520006.png",
        "timestamp": 1532274150305,
        "duration": 5808
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13688,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ad0010-00ae-00d5-00f1-004400fd00c4.png",
        "timestamp": 1532274250560,
        "duration": 3557
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9408,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "TypeError: emptiedCallback is not a function",
        "trace": "TypeError: emptiedCallback is not a function\n    at C:\\Users\\asus\\node_modules\\clear-dir\\index.js:25:9\n    at FSReqWrap.oncomplete (fs.js:135:15)",
        "browserLogs": [],
        "screenShotFile": "00680008-002e-00dc-00ba-0011004b00dd.png",
        "timestamp": 1532274657794,
        "duration": 3305
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12996,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "TypeError: emptiedCallback is not a function",
        "trace": "TypeError: emptiedCallback is not a function\n    at C:\\Users\\asus\\node_modules\\clear-dir\\index.js:25:9\n    at FSReqWrap.oncomplete (fs.js:135:15)",
        "browserLogs": [],
        "screenShotFile": "00a100b4-00cf-00fa-0084-00c00095003d.png",
        "timestamp": 1532274708956,
        "duration": 2949
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13972,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Error: ENOENT: no such file or directory, unlink 'C:\\Users\\asus\\eclipse-workspace\\tmp\\screenshots'",
        "trace": "Error: ENOENT: no such file or directory, unlink 'C:\\Users\\asus\\eclipse-workspace\\tmp\\screenshots'",
        "browserLogs": [],
        "screenShotFile": "004400e8-00a0-0019-0003-005800510032.png",
        "timestamp": 1532275539823,
        "duration": 1808
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10956,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Error: ENOENT: no such file or directory, unlink 'C:\\Users\\asus\\eclipse-workspace\\tmp\\screenshots'",
        "trace": "Error: ENOENT: no such file or directory, unlink 'C:\\Users\\asus\\eclipse-workspace\\tmp\\screenshots'",
        "browserLogs": [],
        "screenShotFile": "00c800e5-00f8-0032-0040-0054001800e0.png",
        "timestamp": 1532275595573,
        "duration": 2656
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13496,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Error: EPERM: operation not permitted, unlink 'C:\\Users\\asus\\eclipse-workspace\\Protractor\\tmp'",
        "trace": "Error: EPERM: operation not permitted, unlink 'C:\\Users\\asus\\eclipse-workspace\\Protractor\\tmp'",
        "browserLogs": [],
        "screenShotFile": "00c000e3-0093-0089-0052-00840016008a.png",
        "timestamp": 1532275651159,
        "duration": 2598
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14344,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Error: EPERM: operation not permitted, unlink 'C:\\Users\\asus\\eclipse-workspace\\Protractor\\tmp'",
        "trace": "Error: EPERM: operation not permitted, unlink 'C:\\Users\\asus\\eclipse-workspace\\Protractor\\tmp'",
        "browserLogs": [],
        "screenShotFile": "00330087-00d6-009e-009b-0021005100b2.png",
        "timestamp": 1532275715072,
        "duration": 2759
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17660,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003e00c7-0031-002e-009f-007f005800fb.png",
        "timestamp": 1532276886245,
        "duration": 2208
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16028,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0023006a-006a-006b-0062-004d00cd00d3.png",
        "timestamp": 1532276915091,
        "duration": 1889
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18232,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00dc0023-00d7-0096-006c-00cd000300dc.png",
        "timestamp": 1532277335476,
        "duration": 2136
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1696,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c60009-0010-0045-0084-009500d9001f.png",
        "timestamp": 1532277435602,
        "duration": 2050
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16364,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000e0094-003f-0098-007a-00ea00c900bb.png",
        "timestamp": 1532277536260,
        "duration": 2603
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12040,
        "browser": {
            "name": "chrome",
            "version": "67.0.3396.99"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001200b7-00fd-0021-0098-00d1002b00f0.png",
        "timestamp": 1532283166298,
        "duration": 3373
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8076,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Cannot read property 'url' of undefined",
        "trace": "TypeError: Cannot read property 'url' of undefined\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:6:47)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run beforeEach in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:4:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00740054-0053-005f-0047-001b00d400a2.png",
        "timestamp": 1535736690839,
        "duration": 1164
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12136,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Cannot read property 'url' of undefined",
        "trace": "TypeError: Cannot read property 'url' of undefined\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:6:47)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run beforeEach in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:4:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00ce005f-004c-002a-0000-001c0038000f.png",
        "timestamp": 1535736708001,
        "duration": 1158
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14940,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Cannot read property 'url' of undefined",
        "trace": "TypeError: Cannot read property 'url' of undefined\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:6:47)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run beforeEach in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:4:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "008700d9-006d-0028-0020-0050009a007b.png",
        "timestamp": 1536085465116,
        "duration": 1151
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1988,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: excel.readexcel is not a function",
        "trace": "TypeError: excel.readexcel is not a function\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:12:31)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "007c0026-00c5-0059-007c-0078001f0083.png",
        "timestamp": 1536085500950,
        "duration": 6881
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6048,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: each key must be a number of string; got undefined",
        "trace": "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at base.enterText (C:\\Users\\asus\\eclipse-workspace\\Protractor\\BaseClass\\BaseClass.js:5:11)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:12:8)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00c10060-001c-002d-0019-007d00290001.png",
        "timestamp": 1536085566246,
        "duration": 9016
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12772,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: each key must be a number of string; got undefined",
        "trace": "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at base.enterText (C:\\Users\\asus\\eclipse-workspace\\Protractor\\BaseClass\\BaseClass.js:5:11)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:12:8)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "006300c3-006d-004c-00c3-000e004e00eb.png",
        "timestamp": 1536085671767,
        "duration": 3491
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10636,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: each key must be a number of string; got undefined",
        "trace": "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at base.enterText (C:\\Users\\asus\\eclipse-workspace\\Protractor\\BaseClass\\BaseClass.js:5:11)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:12:8)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "0066000a-00b5-00d5-00be-000c005800e3.png",
        "timestamp": 1536085838471,
        "duration": 2818
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1796,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001c0070-0077-0018-00c9-005600b7001e.png",
        "timestamp": 1536085937872,
        "duration": 3597
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13180,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://apis.google.com/_/scs/abc-static/_/js/k=gapi.gapi.en.7_zYrcOKhe0.O/m=gapi_iframes,googleapis_client,plusone/rt=j/sv=1/d=1/ed=1/rs=AHpOoo_tirFeAub0r3Y1DFynYgUbfJZWLA/cb=gapi.loaded_0 338 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1536169984565,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://apis.google.com/_/scs/abc-static/_/js/k=gapi.gapi.en.7_zYrcOKhe0.O/m=gapi_iframes,googleapis_client,plusone/rt=j/sv=1/d=1/ed=1/rs=AHpOoo_tirFeAub0r3Y1DFynYgUbfJZWLA/cb=gapi.loaded_0 338 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1536169984565,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://apis.google.com/_/scs/abc-static/_/js/k=gapi.gapi.en.7_zYrcOKhe0.O/m=gapi_iframes,googleapis_client,plusone/rt=j/sv=1/d=1/ed=1/rs=AHpOoo_tirFeAub0r3Y1DFynYgUbfJZWLA/cb=gapi.loaded_0 338 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1536169984565,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://apis.google.com/_/scs/abc-static/_/js/k=gapi.gapi.en.7_zYrcOKhe0.O/m=gapi_iframes,googleapis_client,plusone/rt=j/sv=1/d=1/ed=1/rs=AHpOoo_tirFeAub0r3Y1DFynYgUbfJZWLA/cb=gapi.loaded_0 338 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1536169984565,
                "type": ""
            }
        ],
        "screenShotFile": "00c00070-0061-0001-001c-005800d00012.png",
        "timestamp": 1536169981527,
        "duration": 4513
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15100,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00020099-0018-0005-0084-00a400d5005c.png",
        "timestamp": 1536170026915,
        "duration": 3361
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14492,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: each key must be a number of string; got undefined",
        "trace": "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at base.enterText (C:\\Users\\asus\\eclipse-workspace\\Protractor\\BaseClass\\BaseClass.js:5:11)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:12:8)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00e200da-00ec-0019-0079-0036007e0081.png",
        "timestamp": 1536170121923,
        "duration": 3021
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9560,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: ex.readexcel is not a function",
        "trace": "TypeError: ex.readexcel is not a function\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:12:28)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "005f00ca-00fa-0005-005e-0090008100e5.png",
        "timestamp": 1536170227044,
        "duration": 6348
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3588,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: each key must be a number of string; got undefined",
        "trace": "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at base.enterText (C:\\Users\\asus\\eclipse-workspace\\Protractor\\BaseClass\\BaseClass.js:5:11)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:12:8)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "0043008c-008e-008e-0083-0086002c0084.png",
        "timestamp": 1536170251739,
        "duration": 6392
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10020,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: cellValue is not defined",
        "trace": "ReferenceError: cellValue is not defined\n    at excelActions.readexcel (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Excel\\excel.js:14:3)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:12:28)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "0007006b-00bb-00d0-00d6-00c400c60049.png",
        "timestamp": 1536170500744,
        "duration": 3320
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2352,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Cannot read property 'value' of undefined",
        "trace": "TypeError: Cannot read property 'value' of undefined\n    at excelActions.readexcel (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Excel\\excel.js:15:20)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:12:28)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "001000f1-0029-0013-0040-0026002a00b0.png",
        "timestamp": 1536170577901,
        "duration": 2932
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6232,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Cannot read property 'value' of undefined",
        "trace": "TypeError: Cannot read property 'value' of undefined\n    at excelActions.readexcel (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Excel\\excel.js:15:20)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:12:28)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://apis.google.com/_/scs/abc-static/_/js/k=gapi.gapi.en.7_zYrcOKhe0.O/m=gapi_iframes,googleapis_client,plusone/rt=j/sv=1/d=1/ed=1/rs=AHpOoo_tirFeAub0r3Y1DFynYgUbfJZWLA/cb=gapi.loaded_0 338 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1536170624894,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://apis.google.com/_/scs/abc-static/_/js/k=gapi.gapi.en.7_zYrcOKhe0.O/m=gapi_iframes,googleapis_client,plusone/rt=j/sv=1/d=1/ed=1/rs=AHpOoo_tirFeAub0r3Y1DFynYgUbfJZWLA/cb=gapi.loaded_0 338 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1536170624894,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://apis.google.com/_/scs/abc-static/_/js/k=gapi.gapi.en.7_zYrcOKhe0.O/m=gapi_iframes,googleapis_client,plusone/rt=j/sv=1/d=1/ed=1/rs=AHpOoo_tirFeAub0r3Y1DFynYgUbfJZWLA/cb=gapi.loaded_0 338 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1536170624895,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://apis.google.com/_/scs/abc-static/_/js/k=gapi.gapi.en.7_zYrcOKhe0.O/m=gapi_iframes,googleapis_client,plusone/rt=j/sv=1/d=1/ed=1/rs=AHpOoo_tirFeAub0r3Y1DFynYgUbfJZWLA/cb=gapi.loaded_0 338 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1536170624895,
                "type": ""
            }
        ],
        "screenShotFile": "00cc00cd-00f3-00cc-006e-0003000000f0.png",
        "timestamp": 1536170621428,
        "duration": 4655
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3924,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: each key must be a number of string; got undefined",
        "trace": "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at base.enterText (C:\\Users\\asus\\eclipse-workspace\\Protractor\\BaseClass\\BaseClass.js:5:11)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:12:8)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "007d0070-0089-00b0-00e2-006f00ad00ae.png",
        "timestamp": 1536170708193,
        "duration": 2978
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2960,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b900de-0058-00b5-0087-003500760035.png",
        "timestamp": 1536170863910,
        "duration": 2892
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1472,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f400da-0071-00fb-00f1-005300b100a6.png",
        "timestamp": 1536171205207,
        "duration": 2617
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7804,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00aa00f9-008c-00bc-0069-008c00250079.png",
        "timestamp": 1536171313762,
        "duration": 2861
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12036,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: End of data reached (data length = 0, asked index = 4). Corrupted zip ?",
        "trace": "Error: End of data reached (data length = 0, asked index = 4). Corrupted zip ?\n    at NodeBufferReader.checkIndex (C:\\Users\\asus\\node_modules\\jszip\\lib\\reader\\DataReader.js:26:19)\n    at NodeBufferReader.checkOffset (C:\\Users\\asus\\node_modules\\jszip\\lib\\reader\\DataReader.js:17:14)\n    at NodeBufferReader.readData (C:\\Users\\asus\\node_modules\\jszip\\lib\\reader\\NodeBufferReader.js:14:10)\n    at NodeBufferReader.readString (C:\\Users\\asus\\node_modules\\jszip\\lib\\reader\\DataReader.js:75:49)\n    at ZipEntries.isSignature (C:\\Users\\asus\\node_modules\\jszip\\lib\\zipEntries.js:40:37)\n    at ZipEntries.readEndOfCentral (C:\\Users\\asus\\node_modules\\jszip\\lib\\zipEntries.js:165:35)\n    at ZipEntries.load (C:\\Users\\asus\\node_modules\\jszip\\lib\\zipEntries.js:256:14)\n    at C:\\Users\\asus\\node_modules\\jszip\\lib\\load.js:49:20\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at base.enterText (C:\\Users\\asus\\eclipse-workspace\\Protractor\\BaseClass\\BaseClass.js:5:11)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:13:8)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "000a00ef-00b0-00a9-00ee-009800fa00cd.png",
        "timestamp": 1536171523393,
        "duration": 2573
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8684,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: createAndFillWorkbook is not defined",
        "trace": "ReferenceError: createAndFillWorkbook is not defined\n    at excelActions.writeExcel (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Excel\\excel.js:21:18)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:12:6)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "005c0005-00c2-00c5-00f8-000f00dd009b.png",
        "timestamp": 1536171642114,
        "duration": 3538
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10364,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: createAndFillWorkbook is not defined",
        "trace": "ReferenceError: createAndFillWorkbook is not defined\n    at excelActions.writeExcel (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Excel\\excel.js:21:18)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:12:6)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00380082-00dc-00fb-004b-008f00f800e1.png",
        "timestamp": 1536171713315,
        "duration": 2808
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15192,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Failed: Cannot read property 'getRow' of undefined",
        "trace": "TypeError: Cannot read property 'getRow' of undefined\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\Excel\\excel.js:12:23\n    at <anonymous>\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at base.enterText (C:\\Users\\asus\\eclipse-workspace\\Protractor\\BaseClass\\BaseClass.js:5:11)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:13:8)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:13)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00f10097-000b-0047-0016-006d00ac005d.png",
        "timestamp": 1536346897353,
        "duration": 4468
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12408,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00390046-003a-00d4-0092-00a5006c0085.png",
        "timestamp": 1536346959065,
        "duration": 3480
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3180,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000b00e3-00de-00a2-00d1-00dc00d000c0.png",
        "timestamp": 1536347068405,
        "duration": 3346
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8060,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b10012-0069-0038-0089-0088004700cc.png",
        "timestamp": 1536347176521,
        "duration": 3287
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2852,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000300a8-0003-00a8-000c-00a600e300b9.png",
        "timestamp": 1536347274030,
        "duration": 3237
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2524,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003f00c7-003d-00fd-006e-0065008b0011.png",
        "timestamp": 1536347301604,
        "duration": 4598
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9596,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ce003f-0075-00e4-005f-006a006e0012.png",
        "timestamp": 1538752577420,
        "duration": 2269
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11384,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Failed: No element found using locator: By(css selector, input#username)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, input#username)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:14:12)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:12)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "000400f7-004f-009b-007d-00be00fe0067.png",
        "timestamp": 1538758909412,
        "duration": 2645
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Failed: No element found using locator: By(css selector, input#formly_2_input_username_0)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, input#formly_2_input_username_0)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:16:12)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:12)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1538758997982,
                "type": ""
            }
        ],
        "screenShotFile": "00d000a7-004a-00d7-00b2-000b003600e4.png",
        "timestamp": 1538758995106,
        "duration": 3707
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5492,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Failed: No element found using locator: By(css selector, input#formly_2_input_username_0)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, input#formly_2_input_username_0)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:16:12)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:12)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1538759065012,
                "type": ""
            }
        ],
        "screenShotFile": "002f003e-00a8-0067-004e-0050009000de.png",
        "timestamp": 1538759062547,
        "duration": 2825
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11788,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Failed: No element found using locator: By(css selector, input#formly_2_input_username_0)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, input#formly_2_input_username_0)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:17:12)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:12)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1538759118942,
                "type": ""
            }
        ],
        "screenShotFile": "00c1003d-00b3-00e3-0040-0072006700a6.png",
        "timestamp": 1538759116393,
        "duration": 3198
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6504,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Failed: No element found using locator: By(css selector, button#btn btn-danger)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, button#btn btn-danger)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:18:10)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:12)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1538759178532,
                "type": ""
            }
        ],
        "screenShotFile": "00210008-007b-000a-0076-00c2004b004e.png",
        "timestamp": 1538759175887,
        "duration": 3305
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7144,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Failed: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.40.565498 (ea082db3280dd6843ebfb08a625e3eb905c4f5ab),platform=Windows NT 10.0.17763 x86_64)",
        "trace": "InvalidSelectorError: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.40.565498 (ea082db3280dd6843ebfb08a625e3eb905c4f5ab),platform=Windows NT 10.0.17763 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.findElements(By(css selector, ng-click=Auth.login()))\n    at Driver.schedule (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.findElements (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1048:19)\n    at ptor.waitForAngular.then (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:159:44)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\built\\element.js:831:22)\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:18:10)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:12)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1538759288909,
                "type": ""
            }
        ],
        "screenShotFile": "00e800f9-0042-0086-00f9-005300d300b1.png",
        "timestamp": 1538759285813,
        "duration": 3863
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12064,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1538759345859,
                "type": ""
            }
        ],
        "screenShotFile": "00ea00b9-004e-00ff-00d0-000e00020025.png",
        "timestamp": 1538759342222,
        "duration": 4790
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12440,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1538759464961,
                "type": ""
            }
        ],
        "screenShotFile": "00bd0032-0047-0078-0013-000e00e50037.png",
        "timestamp": 1538759461217,
        "duration": 5457
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9708,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1538759695420,
                "type": ""
            }
        ],
        "screenShotFile": "006700b4-0092-0019-00f2-00f300ca001a.png",
        "timestamp": 1538759692609,
        "duration": 5290
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9144,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1538759849291,
                "type": ""
            }
        ],
        "screenShotFile": "00060083-00b7-00d0-00bb-002c004b0039.png",
        "timestamp": 1538759846565,
        "duration": 4488
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18172,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1539105429267,
                "type": ""
            }
        ],
        "screenShotFile": "00b20051-002e-0001-0091-00c400ce005c.png",
        "timestamp": 1539105425611,
        "duration": 5413
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17392,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1539105683953,
                "type": ""
            }
        ],
        "screenShotFile": "0001007f-00ee-0050-00eb-0000002f000c.png",
        "timestamp": 1539105679466,
        "duration": 6046
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15588,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1539105784944,
                "type": ""
            }
        ],
        "screenShotFile": "00d60093-0001-0081-000d-00d500550015.png",
        "timestamp": 1539105782374,
        "duration": 4088
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1539105857373,
                "type": ""
            }
        ],
        "screenShotFile": "005e009d-0070-00c9-0002-005c00e8002f.png",
        "timestamp": 1539105855097,
        "duration": 3783
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17460,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1539106010907,
                "type": ""
            }
        ],
        "screenShotFile": "00110068-0018-0059-0051-009300ac00a8.png",
        "timestamp": 1539106008666,
        "duration": 3772
    },
    {
        "description": "new1|new",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12320,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Failed: caseStatus is not defined",
        "trace": "ReferenceError: caseStatus is not defined\n    at loginPage.enterValue (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Pages\\1Page.js:41:10)\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:10:12)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: Run it(\"new1\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:8:2)\n    at addSpecsToSuite (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\asus\\eclipse-workspace\\Protractor\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\asus\\eclipse-workspace\\Protractor\\Tests\\1Test.js:3:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00d50099-002b-00c8-007c-005900cc00ef.png",
        "timestamp": 1539106336806,
        "duration": 2149
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13132,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1539106533971,
                "type": ""
            }
        ],
        "screenShotFile": "00dc00e2-00c7-0093-00d2-001600d100b2.png",
        "timestamp": 1539106531642,
        "duration": 4085
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1539106565126,
                "type": ""
            }
        ],
        "screenShotFile": "008d00a9-00b1-0082-0037-00640096006c.png",
        "timestamp": 1539106562289,
        "duration": 4394
    },
    {
        "description": "new1|new",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14240,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://www.way2automation.com/angularjs-protractor/registeration/#/login - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1539106781892,
                "type": ""
            }
        ],
        "screenShotFile": "00c300d9-002c-0089-0000-0020008e0069.png",
        "timestamp": 1539106779261,
        "duration": 4100
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length-1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};