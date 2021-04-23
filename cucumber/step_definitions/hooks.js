const { After, Status} = require('cucumber');
const { takeScreenshot } = require("../../utils/screenshot");

After(async scenario => {
    if(scenario.result.status === Status.FAILED) {
        await takeScreenshot(scenario);
    }
});