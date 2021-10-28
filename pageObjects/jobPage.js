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
    * Add first name in first name box
    * @param firstName
    * @returns {promise.Promise<void>}
    */
    async addFirstName(firstName) {
        this.firstNameBox.click();
        this.firstNameBox.sendKeys(firstName);
        return this.wait(1);
    }

    /**
    * Add last name in last name box
    * @param lastName
    * @returns {promise.Promise<void>}
    */
    async addLastName(lastName) {
        this.lastNameBox.click();
        this.lastNameBox.sendKeys(lastName);
        return this.wait(1);
    }

    /**
    * Add email in email box
    * @param email
    * @returns {promise.Promise<void>}
    */
    async addEmail(email) {
        this.emailBox.click();
        this.emailBox.sendKeys(email);
        return this.wait(1);
    }

}

module.exports = JobPage;