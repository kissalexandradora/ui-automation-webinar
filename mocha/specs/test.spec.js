'use strict';
const CareerPage = require('../../pageObjects/careerPage');
const careerPage = new CareerPage();
const { getRandomTestData } = require('../../data/dataProvider')

describe('Search for job', function () {
    this.timeout(GLOBAL_TIMEOUT);
    let testData;

    /**
     * Before the first test case execution,
     * the before hook gets the random test data
     * from the data provider.
     */
    before(async () => {
        testData = await getRandomTestData();
        console.log(testData);
    });

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
                return careerPage.selectCityInCountry(testData["country"], testData["city"]);
            });

            it('should provide a way to filter to a specific location', () => {
                return expect(careerPage.getSelectedCity()).to.eventually.equal(testData["city"]);
            });
        });

        describe('Department filter box', () => {
            beforeEach(() => {
                return careerPage.toggleDepartment(testData["department"]);
            });

            it('should provide a way to filter to a specific department', () => {
                return expect(careerPage.selectedDepartments.getText()).to.eventually.contain(testData["department"].toUpperCase());
            });
        });

        describe('Searching', () => {
            let position;

            beforeEach(async () => {
                await careerPage.selectCityInCountry(testData["country"], testData["city"]);
                await careerPage.toggleDepartment(testData["department"]);
                return careerPage.search().then(() => {
                    position = careerPage.getResultByPosition(testData["positionName"]);
                });
            });

            it('should have proper job found', () => {
                return expect(position.isDisplayed()).to.eventually.be.true;
            });

            it('should have job with proper location', () => {
                return expect(careerPage.locationOfPosition(position).getText()).to.eventually.include(testData["country"].toUpperCase());
            });

            it('should have apply button for job', () => {
                return expect(careerPage.applyButtonOfPosition(position).getText()).to.eventually.include("APPLY");
            });

            describe('Applying to position', () => {
                beforeEach(() => {
                    careerPage.applyForPosition(position);
                });

                it('should have proper position name in the description', () => {
                    expect(careerPage.jobDescription.getText()).to.eventually.include(testData["positionName"]);
                });
            });
        });
    });
});