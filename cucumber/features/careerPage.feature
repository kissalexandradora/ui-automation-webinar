Feature: EPAM job searching
  As a Job searcher
  I want to browser through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

  Background: Career page is opened
    Given the career page is opened
    Then the logo should be visible
    And the cookie bar should be hidden
    And the search form should be visible

  Scenario Outline: Searching for a job - <PositonName>
    When the <City>, <Country> is selected in the location filter box
    Then the <City> should be selected in the location filter box

    When the <Department> is selected in the department filter box
    Then the <Department> should be selected in the department filter box

    When the search button is clicked
    Then there should be a job offer for <PositionName> position
    And the location of the <PositionName> position should be <Country>

    When the apply button of the <PositionName> position is clicked on
    Then the description of the job offer should contain the <PositionName> position name

    Examples:
      | Country | City     | Department                | PositionName             |
      | Hungary | Debrecen | Software Test Engineering | Test Automation Engineer |
      | Belarus | Minsk    | Software Architecture     | Architect                |


  Scenario Outline: Searching for a job - <PositonName>
    And the checkbox should be visible

    When the <Choose> is selected in the checkbox
    Then the <Choose> should be selected in the checkbox
    And the search button should be visible

    When the search button is clicked
    Then there should be a job offer for <PositionName> position

    When the apply button of the <PositionName> position is clicked on
    Then the description of the job offer should contain the <PositionName> position name

    Examples:
      | Choose     | PositionName |
      | relocation | Architect    |
      | office     | Architect    |
      | remote     | Specialist   |


  Scenario Outline: Searching for a job and apply
    And the checkbox should be visible

    When the <Choose> is selected in the checkbox
    Then the <Choose> should be selected in the checkbox
    And the search button should be visible

    When the search button is clicked
    Then there should be a job offer for <PositionName> position

    When the apply button of the <PositionName> position is clicked on
    Then the description of the job offer should contain the <PositionName> position name
    And the apply form should be visible
    And the first name, last name, email textbox should be visible

    When the <FirstName> is wrote in the first name box
    Then the <FirstName> should be wrote in the first name box

    When the <LastName> is wrote in the last name box
    Then the <LastName> should be wrote in the last name box

    When the <Email> is wrote in the email box
    Then the <Email> should be wrote in the email box

    Examples:
      | Choose     | PositionName | FirstName | LastName | Email                |
      | relocation | Architect    | Adam      | Brown    | adam.brown@gmail.com |
      | office     | Architect    | Joe       | Rambo    | joe.rambo@gmail.com  |
      | remote     | Specialist   | Jack      | Red      | jack@gmail.com       |