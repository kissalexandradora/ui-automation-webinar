'use strict';

const { defineSupportCode } = require('cucumber');
const CareerPage = require('../../pageObjects/careerPage');
const careerPage = new CareerPage();

defineSupportCode(({ Given, When, Then, setDefaultTimeout }) => {
    setDefaultTimeout(GLOBAL_TIMEOUT);

    Given(/^the career page is opened$/, () => {
        return careerPage.load();
    });

    When(/(.+), (.+) is selected in the location filter box/, (city, country) => {
        return careerPage.selectCityInCountry(country, city);
    });

    When(/(.+) is selected in the department filter box/, department => {
        return careerPage.toggleDepartment(department);
    });

    When(/the search button is clicked/, () => {
        return careerPage.search();
    });

    Then(/the logo should be visible/, () => {
        return expect(careerPage.logo.isDisplayed()).to.eventually.be.true;
    });

    Then(/^the cookie bar should be (hidden|visible)$/, visibility => {
        return expect(careerPage.cookieBanner.isVisible()).to.eventually.be.equal(visibility === "visible");
    });

    Then(/the search form should be visible/, () => {
        return expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
    });

    Then(/(.+) should be selected in the location filter box/, city => {
        return expect(careerPage.getSelectedCity()).to.eventually.equal(city);
    });

    Then(/(.+) should be selected in the department filter box/, department => {
        return expect(careerPage.selectedDepartments.getText()).to.eventually.contain(department.toUpperCase());
    })

    Then(/there should be a job offer for (.+) position/, positionName => {
        return expect(careerPage.nameOfPosition(careerPage.getResultByPosition(positionName))
            .getText()).to.eventually.contain(positionName);
    })

    Then(/the location of the <PositionName> position should be <City>, <Country>/, () => {

    });
});