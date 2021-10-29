'use strict';
const firefoxSupport = require('protractor-firefox-support');
const driver = require("protractor");

class JobPage {
    constructor() {
        this.logo = element(by.css('.header__logo-container'));
        this.applyForm = element(by.css('div[id=apply]'));
        this.firstNameBox = this.applyForm.element(by.css('input[name = applicantFirstName]'));
        this.lastNameBox = this.applyForm.element(by.css('input[name = applicantLastName]'));
        this.emailBox = this.applyForm.element(by.css('input[name = applicantEmail]'));
    }

    /**
    * Waits for a specified time.
    *
    * @param sec: Waiting time in second.
    * @returns {promise.Promise<void>}
    */
    wait(sec) {
        return browser.sleep(sec * 1000);
    }

    /**
    * Add text in the textbox
    * @param value
    * @param firstName
    * @param lastName
    * @param email
    * @returns {promise.Promise<void>}
    */
    async addTextInTextbox(value, firstName, lastName, email) {
        if (value === firstName) {
            this.firstNameBox.click();
            this.firstNameBox.sendKeys(value);
        } else if (value === lastName) {
            this.lastNameBox.click();
            this.lastNameBox.sendKeys(value);
        } else if (value === email) {
            this.emailBox.click();
            this.emailBox.sendKeys(value);
        }
        return this.wait(1);
    }
}

module.exports = JobPage;