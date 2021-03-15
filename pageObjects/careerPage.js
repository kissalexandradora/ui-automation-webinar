'use strict'

class CareerPage {
    constructor() {
        this.logo = element(by.css('a.header__logo-container'));
        this.searchForm = element(by.css('.job-search__form'));
        this.searchButton = this.searchForm.element(by.css('.recruiting-search__submit'));

        this.locationFilterBox = this.searchForm.element(by.css('.selection .select2-selection'));
        this.selectedLocation = element(by.css('.select2-selection__rendered'));
        this.getCountryOfLocation = country => element(by.cssContainingText('#select2-new_form_job_search_1445745853_copy-location-results > li > strong', country));
        this.getCityOfLocation = city => element(by.cssContainingText('#select2-new_form_job_search_1445745853_copy-location-results > li > ul > li', city));

        this.departmentSelect = this.searchForm.element(by.css('div:nth-child(3) > div > div.selected-params'));
        this.getDepartmentCheckbox = department => element(by.cssContainingText('div.multi-select-dropdown > ul:nth-child(2) > li > label > span', department))
        this.selectedDepartments = element.all(by.css('li.filter-tag'));

        this.searchResultItems = element.all(by.css('.search-result__list'));
        this.nameOfPosition = position => position.element(by.css('.search-result__item-name'));
        this.locationOfPosition = position => position.element(by.css('.search-result__location'));
        this.applyButtonOfPosition = position => position.element(by.css('.search-result__item-apply'));

        this.waitForPositionVisibility = item => browser.wait(ec.visibilityOf(this.nameOfPosition(item)), GLOBAL_TIMEOUT);

        this.getResultByPosition = name => this.searchResultItems.filter(item => {
            this.waitForPositionVisibility(item);
            return this.nameOfPosition(item).getText().then(position => position.trim().includes(name));
        }).first();

        this.jobDescription = element(by.css('.recruiting-page__top-description strong'));
    }

    load() {
        browser.get('https://www.epam.com/careers');
        return browser.wait(ec.elementToBeClickable(this.logo), GLOBAL_TIMEOUT);
    }

    selectCityInCountry(county, city) {
        const countryOption = this.getCountryOfLocation(county);
        countryOption.isDisplayed().then(displayed => {
            if (!displayed) {
                this.locationFilterBox.click();
            }
        }, e => this.locationFilterBox.click());
        const cityOption = this.getCityOfLocation(city);
        cityOption.isDisplayed().then(displayed => {
            if (!displayed) {
                countryOption.click();
            }
        }, e => countryOption.click());
        return cityOption.click();
    }

    toggleDepartment(department) {
        //click all and assert
        const departmentCheckbox = this.getDepartmentCheckbox(department);
        departmentCheckbox.isDisplayed().then(displayed => {
            if (!displayed) {
                this.departmentSelect.click();
            }
        }, e => this.departmentSelect.click());
        browser.wait(ec.visibilityOf(departmentCheckbox), GLOBAL_TIMEOUT);
        return departmentCheckbox.click();
    }

    getSelectedCity() {
        return this.selectedLocation.getText();
    }

    search() {
        this.searchButton.click();
        return browser.wait(() => {
            return this.searchResultItems.count().then(n => n > 0);
        }, GLOBAL_TIMEOUT);
    }

    applyForPosition(position) {
        this.applyButtonOfPosition(position).click();
        return browser.wait(ec.visibilityOf(this.jobDescription), GLOBAL_TIMEOUT);
    }
}

module.exports = CareerPage;