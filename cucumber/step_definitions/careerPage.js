'use strict';

const { Given, When, Then, setDefaultTimeout } = require('cucumber');
const CareerPage = require('../../pageObjects/careerPage');
const careerPage = new CareerPage();

const JobPage = require('../../pageObjects/jobPage');
const jobPage = new JobPage();

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



When(/^the (.+) is selected in the checkbox$/, (choose) => {
    return careerPage.clickedCheckbox(choose);
});



When(/^the search button is clicked$/, () => {
    return careerPage.search();
});

When(/^the apply button of the (.+) position is clicked on$/, positionName => {
    const position = careerPage.getResultByPosition(positionName);
    careerPage.applyForPosition(position);
    return browser.wait(ec.visibilityOf(careerPage.jobDescription), GLOBAL_TIMEOUT);
});



When(/^the (.+) is wrote in the first name box$/, firstName => {
    return jobPage.addFirstName(firstName);
});

When(/^the (.+) is wrote in the last name box$/, lastName => {
    return jobPage.addLastName(lastName);
});

When(/^the (.+) is wrote in the email box$/, email => {
    return jobPage.addEmail(email);
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



Then(/^the checkbox should be visible$/, () => {
    return expect(careerPage.openToRelocationCheckbox.isDisplayed()).to.eventually.be.true,
    expect(careerPage.officeCheckbox.isDisplayed()).to.eventually.be.true,
    expect(careerPage.remoteCheckbox.isDisplayed()).to.eventually.be.true;
});



Then(/^the (.+) should be selected in the location filter box$/, city => {
    return expect(careerPage.getSelectedCity()).to.eventually.equal(city);
});

Then(/^the (.+) should be selected in the department filter box$/, department => {
    return expect(careerPage.selectedDepartments.getText()).to.eventually.contain(department.toUpperCase());
});



Then(/^the (.+) should be selected in the checkbox$/, choose => {
    const selectedItem = careerPage.checkbox.element(by.css(`input[name*="${choose}"]`));
    return expect(selectedItem.isSelected()).to.eventually.be.equal(true);
});



Then(/^there should be a job offer for (.+) position$/, positionName => {
    const position = careerPage.getResultByPosition(positionName);
    return expect(careerPage.nameOfPosition(position).getText()).to.eventually.contain(positionName);
});

Then(/^the location of the (.+) position should be (.+)$/, (positionName, country) => {
    const position = careerPage.getResultByPosition(positionName);
    return expect(careerPage.locationOfPosition(position)
        .getText()).to.eventually.contain(country.toUpperCase());
});

Then(/^the description of the job offer should contain the (.+) position name$/, positionName => {
    return expect(careerPage.jobDescription.getText()).to.eventually.contain(positionName);
});



Then(/^the apply form should be visible$/, () => {
    return expect(jobPage.applyForm.isDisplayed()).to.eventually.be.true;
});

Then(/^the first name, last name, email textbox should be visible$/, () => {
    return expect(jobPage.firstNameBox.isDisplayed()).to.eventually.be.true,
    expect(jobPage.lastNameBox.isDisplayed()).to.eventually.be.true,
    expect(jobPage.emailBox.isDisplayed()).to.eventually.be.true;
});

Then(/^the (.+) should be wrote in the first name box$/, firstName => {
    return expect(jobPage.firstNameBox.getAttribute('value')).to.eventually.be.equal(firstName);
});

Then(/^the (.+) should be wrote in the last name box$/, lastName => {
    return expect(jobPage.lastNameBox.getAttribute('value')).to.eventually.be.equal(lastName);
});

Then(/^the (.+) should be wrote in the email box$/, email => {
    return expect(jobPage.emailBox.getAttribute('value')).to.eventually.be.equal(email);
});