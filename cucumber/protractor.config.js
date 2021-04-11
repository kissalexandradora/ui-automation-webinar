'use strict';

const GLOBAL_TIMEOUT = 40e3;

exports.config = {
    specs: './features/**/*.feature',
    // capabilities: {
    //     browserName: 'chrome',
    //     shardTestFiles: true,
    //     maxInstances: 2,
    //     specs: [example1.js, example2.js]
    // },
    multiCapabilities: [
        { browserName: 'chrome' },
        { browserName: 'firefox' }
    ],
    directConnect: true,
    cucumberOpts: {
        require: ['./step_definitions/**/*.js'],
        tags: ['~@wip'],
        format: ['progress', 'json:cucumber.json']
    },
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    getPageTimeout: GLOBAL_TIMEOUT,
    onPrepare: async function () {
        global.GLOBAL_TIMEOUT = GLOBAL_TIMEOUT;
        global.ec = protractor.ExpectedConditions;

        const chai = require('chai');
        chai.use(require('chai-as-promised'));
        global.expect = chai.expect;

        protractor.ElementFinder.prototype.isVisible = function () {
            return this.isPresent().then(present => {
                if (present) {
                    return this.isDisplayed();
                }
                return false;
            })
        };

        await browser.waitForAngularEnabled(false);
        try {
            await browser.manage().window().maximize();
        } catch (e) {
            await browser.manage().window().setSize(1800, 1012);
        }
    }
};