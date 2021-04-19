'use strict';

const { Given, When, Then, setDefaultTimeout, After, Status} = require('cucumber');
const CareerPage = require('../../pageObjects/careerPage');
const careerPage = new CareerPage();

setDefaultTimeout(GLOBAL_TIMEOUT);

Given(/^the career page is opened$/, () => {
    return careerPage.load();
});

When(/^the (.+), (.+) is selected in the location filter box$/, (city, country) => {
    return careerPage.selectCityInCountry(country, city);
});

When(/^the (.+) is selected in the department filter box$/, department => {
    return careerPage.toggleDepartment(department);
});

When(/^the search button is clicked$/, () => {
    return careerPage.search();
});

When(/^the apply button of the (.+) position is clicked on$/, positionName => {
    const position = careerPage.getResultByPosition(positionName);
    careerPage.applyForPosition(position);
    return browser.wait(ec.visibilityOf(careerPage.jobDescription), GLOBAL_TIMEOUT);
});

Then(/^the logo should be visible$/, () => {
    return expect(careerPage.logo.isDisplayed()).to.eventually.be.true;
});

Then(/^the cookie bar should be (hidden|visible)$/, visibility => {
    return expect(careerPage.cookieBanner.isVisible()).to.eventually.be.equal(visibility === "visible");
});

Then(/^the search form should be visible$/, () => {
    return expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
});

Then(/^the (.+) should be selected in the location filter box$/, city => {
    return expect(careerPage.getSelectedCity()).to.eventually.equal(city);
});

Then(/^the (.+) should be selected in the department filter box$/, department => {
    return expect(careerPage.selectedDepartments.getText()).to.eventually.contain(department.toUpperCase());
});

Then(/^there should be a job offer for (.+) position$/, positionName => {
    const position = careerPage.getResultByPosition(positionName);
    return expect(careerPage.nameOfPosition(position).getText()).to.eventually.contain("testScreenshot");
});

Then(/^the location of the (.+) position should be (.+)$/, (positionName, country) => {
    const position = careerPage.getResultByPosition(positionName);
    return expect(careerPage.locationOfPosition(position)
        .getText()).to.eventually.contain(country.toUpperCase());
});

Then(/^the description of the job offer should contain the (.+) position name$/, positionName => {
    return expect(careerPage.jobDescription.getText()).to.eventually.contain(positionName);
});

