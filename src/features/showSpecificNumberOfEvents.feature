Feature: Specific number of events
  Scenario: When user hasn't specified a number the default number is 32
    Given the user hasn't picked or filtered the number of events
    When the user sees the list of events
    Then the default number of displayed events will be 32
  Scenario: User can change the number of events they want to see.
    Given the user has events displayed
    When the user chooses to change the number of events displayed
    Then the number of events displayed will update to the number the user selected