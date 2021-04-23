'use strict'
const firefoxSupport = require('protractor-firefox-support');

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
     * Waits 0.5 sec for the cookie bar and if it's append, accept it.
     * If the cookie bar not appends, continues the test execution.
     *
     * @returns {PromiseLike<void>}
     */
    async acceptCookies() {
        const cookieButton = this.acceptCookiesButton;
        try {
            await browser.wait(ec.elementToBeClickable(cookieButton), 500);
            return cookieButton.click();
        } catch (error) {
            console.log("Cookie bar is not visible.");
        }
    }

    /**
     * Loads the webpage and waits for the logo to be clickable.
     * When the page is loaded, checks if the cookie bar is clickable and accept it, if necessary.
     *
     * @returns {PromiseLike<void>}
     */
    async load() {
        await browser.get('https://www.epam.com/careers');
        await expect(browser.getCurrentUrl()).to.eventually.equal('https://www.epam.com/careers');
        await browser.wait(ec.elementToBeClickable(this.logo), GLOBAL_TIMEOUT);
        return this.acceptCookies();
    }

    /**
     * Returns with a promise, that resolves if the location is displayed
     * and rejects if the location is not displayed.
     *
     * @param location
     * @returns {PromiseLike<void>}
     */
    isLocationDisplayed(location) {
        return location.isDisplayed();
    }

    /**
     * If the country is not displayed in the location filter box
     * or the promise is rejected, clicks the location filter box.
     *
     * @param countryOption
     * @returns {PromiseLike<void | void>}
     */
    async clickLocationFilterBox(countryOption) {
        try {
            const displayed = await this.isLocationDisplayed(countryOption);
            if (!displayed) {
                return this.locationFilterBox.click();
            }
        } catch (error) {
            return this.locationFilterBox.click();
        }
    }

    /**
     * If the city is not displayed in the location filter box
     * or if the promise is rejected, clicks the country option.
     *
     * @param cityOption
     * @param countryOption
     * @returns {PromiseLike<void>}
     */
    async clickCountryOption(cityOption, countryOption) {
        try {
            const displayed = await this.isLocationDisplayed(cityOption);
            if (!displayed) {
                return countryOption.click();
            }
        } catch (error) {
            return countryOption.click();
        }
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
     * Scrolls to the specified element.
     *
     * @param element
     * @returns {promise.Promise<void>}
     */
    async scrollToElement(element) {
        this.wait(2);
        /**
         * The protractor mouseMove action does not work in case of Firefox browser.
         * This line uses the protractor-firefox-support NPM package.
         */
        await browser.executeScript(firefoxSupport.mouseMove, element);
        return this.wait(2);
    }

    /**
     * This function made for the test automation of search bar in the careers page.
     * If the location filter box is not open, opens it.
     * Scrolls to the specified city and clicks it.
     * If the city is not displayed clicks to the city dropdown and selects the specified city.
     *
     * @param country: The name of the country we want to search for.
     * @param city: The name of the city we want to search for.
     * @returns {promise.Promise<void>}
     */
    async selectCityInCountry(country, city) {
        const countryOption = this.getCountryOfLocation(country);
        await this.clickLocationFilterBox(countryOption);
        await this.scrollToElement(countryOption);
        const cityOption = this.getCityOfLocation(city);
        await this.clickCountryOption(cityOption, countryOption);
        return cityOption.click();
    }

    /**
     * Checks whether the department dropdown is displayed.
     *
     * @returns {promise.Promise<boolean>}
     */
    isDepartmentDropdownDisplayed() {
        return this.departmentDropdown.isDisplayed();
    }

    /**
     * Opens the department dropdown, if the departments are not visible.
     *
     * @returns {promise.Promise<void>}
     */
    async clickDepartmentDropdown() {
        const displayed = await this.isDepartmentDropdownDisplayed();
        if (!displayed) {
            return this.departmentSelect.click();
        }
    }

    /**
     * Checks whether the specified department is displayed.
     * If it's displayed, clicks it. If not, opens the toggle and clicks it.
     *
     * @param department
     * @returns {promise.Promise<void>}
     */
    async toggleDepartment(department) {
        this.clickDepartmentDropdown();
        await browser.wait(ec.visibilityOf(this.departmentDropdown), GLOBAL_TIMEOUT);
        const departmentCheckbox = this.getDepartmentCheckbox(department);
        await this.wait(1);
        await departmentCheckbox.click();
        return this.wait(1);
    }

    /**
     * Returns the text from the selected location.
     *
     * @returns {promise.Promise<string>}
     */
    getSelectedCity() {
        return this.selectedLocation.getText();
    }

    /**
     * Clicks the search button and checks that is there any result.
     *
     * @returns {promise.Promise<boolean>}
     */
    async search() {
        await this.searchButton.click();
        return browser.wait(() => {
            return this.searchResultItems.count().then(n => n > 0);
        }, GLOBAL_TIMEOUT);
    }

    /**
     * Applies for the specified position and checks that the description is correct.
     *
     * @param position: The position that we want to apply for.
     * @returns {WebElementPromise}
     */
    async applyForPosition(position) {
        await this.applyButtonOfPosition(position).click();
        return browser.wait(ec.visibilityOf(this.jobDescription), GLOBAL_TIMEOUT);
    }
}

module.exports = CareerPage;