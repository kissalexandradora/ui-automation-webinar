'use strict'

class CareerPage {
    constructor() {
        this.logo = element(by.css('.header__logo-container'));
        this.searchForm = element(by.css('.job-search__form'));
        this.searchButton = this.searchForm.element(by.css('.recruiting-search__submit'));

        this.locationFilterBox = this.searchForm.element(by.css('.select2-selection'));
        this.selectedLocation = element(by.css('.select2-selection__rendered'));
        this.getCountryOfLocation = country => element(by.cssContainingText('li > strong', country));
        this.getCityOfLocation = city => element(by.cssContainingText('#select2-new_form_job_search_1445745853_copy-location-results > li > ul > li', city));

        this.departmentSelect = this.searchForm.element(by.css('.selected-params'));
        this.getDepartmentCheckbox = department => element(by.cssContainingText('ul:nth-child(2) > li > label span', department));
        this.selectedDepartments = element.all(by.css('.filter-tag'));
        this.departmentDropdown = element(by.css('.multi-select-dropdown'));

        this.searchResultItems = element.all(by.css('.search-result__list'));
        this.nameOfPosition = position => position.element(by.css('.search-result__item-name'));
        this.locationOfPosition = position => position.element(by.css('.search-result__location'));
        this.applyButtonOfPosition = position => position.element(by.css('.search-result__item-apply'));

        this.waitForPositionVisibility = item => browser.wait(ec.visibilityOf(this.nameOfPosition(item)), GLOBAL_TIMEOUT);

        /**
         * Finds the position with the specified name, from the list of positions.
         *
         * @param name: The position that we search for.
         * @returns {*|ElementFinder}
         */
        this.getResultByPosition = name => this.searchResultItems.filter(item => {
            this.waitForPositionVisibility(item);
            return this.nameOfPosition(item).getText().then(position => position.trim().includes(name));
        }).first();

        this.jobDescription = element(by.css('.recruiting-page__top-description strong'));
        this.acceptCookiesButton = element(by.css('.cookie-disclaimer__button'));
        this.cookieBanner = element(by.css('.cookie-disclaimer-ui'));
    }

    /**
     * Waits 0.5 sec for the cookie bar and if it's append accept it.
     * If the cookie bar not appends continues the test load.
     *
     * @returns {PromiseLike<void>}
     */
    acceptCookies() {
        const cookieButton = this.acceptCookiesButton;
        return browser.wait(ec.elementToBeClickable(cookieButton), 500).then(() => {
            cookieButton.click();
        }, e => {console.log("Cookie bar is not visible.")});
    }

    /**
     * Load the webpage and waits for the logo to be clickable.
     * If the page is loaded, checks the cookie bar and accept is if necessary.
     *
     * @returns {PromiseLike<void>}
     */
    load() {
        browser.get('https://www.epam.com/careers');
        browser.wait(ec.elementToBeClickable(this.logo), GLOBAL_TIMEOUT);
        return this.acceptCookies();
    }

    /**
     * This function made for the test automation of search bar in the careers page.
     * If the location filter box is not open opens it and click the specified country and city.
     *
     * @param country: The name of the country we want to search for.
     * @param city: The name of the city we want to search for.
     * @returns {promise.Promise<void>}
     */
    selectCityInCountry(country, city) {
        const countryOption = this.getCountryOfLocation(country);
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

    /**
     * Returns if the department dropdown is displayed.
     *
     * @returns {promise.Promise<boolean>}
     */
    isDepartmentDropdownDisplayed() {
        return this.departmentDropdown.isDisplayed();
    }

    /**
     * Opens the department dropdown if the departments are not visible.
     *
     * @returns {promise.Promise<void>}
     */
    clickDepartmentDropdown() {
        return this.isDepartmentDropdownDisplayed().then(async displayed => {
            if (!displayed) {
                await this.departmentSelect.click();
            }
        });
    }

    /**
     * Checks if the specified department is displayed.
     * If it's displayed click it. If not, opens the toggle and click it.
     *
     * @param department
     * @returns {promise.Promise<void>}
     */
    async toggleDepartment(department) {
        this.clickDepartmentDropdown()
        browser.wait(ec.visibilityOf(this.departmentDropdown), GLOBAL_TIMEOUT);
        const departmentCheckbox = this.getDepartmentCheckbox(department);
        browser.sleep(1000);
        await departmentCheckbox.click();
        return browser.sleep(1000);
    }

    getSelectedCity() {
        return this.selectedLocation.getText();
    }

    /**
     * Clicks the search button and checks that is there any result.
     *
     * @returns {promise.Promise<boolean>}
     */
    search() {
        this.searchButton.click();
        return browser.wait(() => {
            return this.searchResultItems.count().then(n => n > 0);
        }, GLOBAL_TIMEOUT);
    }

    /**
     * Apply for the specified position and checks that the description is correct.
     *
     * @param position: The position that we want to apply for.
     * @returns {WebElementPromise}
     */
    applyForPosition(position) {
        this.applyButtonOfPosition(position).click();
        return browser.wait(ec.visibilityOf(this.jobDescription), GLOBAL_TIMEOUT);
    }
}

module.exports = CareerPage;