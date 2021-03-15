'use strict';
const CareerPage = require("../../pageObjects/careerPage");
const careerPage = new CareerPage();


describe('Search for job', function () {
    this.timeout(GLOBAL_TIMEOUT);

    beforeEach(() => careerPage.load())

    describe('Careers page', () => {
        it('should be opened', () => {
            return expect(careerPage.logo.isDisplayed()).to.eventually.be.true;
        });
    });

    describe('Search form', () => {
        it('should be displayed', () => {
            return expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
        });

        describe('Location filter box', () => {
            beforeEach(() => {
                return careerPage.selectCityInCountry('Hungary', 'Debrecen');
            });

            it('should provide a way to filter to a specific location', () => {
                return expect(careerPage.getSelectedCity()).to.eventually.equal('Debrecen');
            });
        });

        describe('Department filter box', () => {
            beforeEach(() => {
                return careerPage.toggleDepartment('Software Test Engineering');
            });

            it('should provide a way to filter to a specific department', () => {
                return expect(careerPage.selectedDepartments.getText()).to.eventually.contain('SOFTWARE TEST ENGINEERING');
            });
        });

        describe.only('Searching', () => {
            let position;

            beforeEach(() => {
                careerPage.selectCityInCountry('Hungary', 'Debrecen');
                careerPage.toggleDepartment('Software Test Engineering');
                return careerPage.search().then(() => {
                    position = careerPage.getResultByPosition('Test Automation Engineer');
                });
            });

            it('should have proper job found', () => {
                return expect(position.isDisplayed()).to.eventually.be.true;
            });

            it('should have job with proper location', () => {
                return expect(careerPage.locationOfPosition(position).getText()).to.eventually.include("DEBRECEN");
            });

            it('should have apply button for job', () => {
                return expect(careerPage.applyButtonOfPosition(position).getText()).to.eventually.include("APPLY");
            });

            describe('Applying to position', () => {
                beforeEach(() => {
                    careerPage.applyButtonOfPosition(position).click();
                });

                it('should have proper position name in the description', () => {
                    expect(careerPage.jobDescription.getText()).to.eventually.include("Test Automation Engineer");
                });
            });
        });
    });
});