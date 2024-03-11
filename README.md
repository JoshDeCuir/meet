Project Features & Scenarios

**Filter Events By City**

*Scenario 1:* When the user hasn't searched for a city, upcoming events from all cities should be displayed.
Given the events app is open, when I view the list of upcoming events, then I should see events from all cities.

*Scenario 2:* Users should see a list of suggestions when searching for a city.
Given the events app is open, when I start typing in the city search bar, then I should see a list of suggested cities.

*Scenario 3:* Users can select a city from the suggested list to filter the events list.
Given the events app is open, when I select a city from the suggested list, then the events list should be filtered for the selected city.

**Show/Hide Event Details**

*Scenario 1:* An event element is collapsed by default.
Given the events app is open, when I view the list of events, then each event element should be collapsed.

*Scenario 2:* Users can expand an event to see details.
Given the events app is open, when I click on an event element, then the details of that event should be visible.

*Scenario 3:* Users can collapse an event to hide details.
Given the events app is open, and event details are visible, when I click on the collapse button, then the details of that event should be hidden.

**Specify Number of Events**

*Scenario 1:* When the user hasn't specified a number, 32 events are shown by default.
Given the events app is open, when I view the list of events, then I should see 32 events displayed.

*Scenario 2:* Users can change the number of events displayed.
Given the events app is open, when I specify the number of events as 50, then I should see 50 events displayed.

**Use the App When Offline**

*Scenario 1:* Show cached data when there's no internet connection.
Given the events app is open, and there is no internet connection, when I view the list of events, then I should see cached event data.

*Scenario 2:* Show an error when the user changes search settings (city, number of events).
Given the events app is open, and there is no internet connection, when I try to change search settings, then I should see an error message.

**Add an App Shortcut to the Home Screen**

*Scenario:* Users can install the meet app as a shortcut on their device home screen.
Given the events app is open, when I choose to add the app to the home screen, then a shortcut to the meet app should be added to the device home screen.

**Display Charts Visualizing Event Details**

*Scenario:* Show a chart with the number of upcoming events in each city.
Given the events app is open, when I navigate to the charts section, then I should see a chart displaying the number of upcoming events in each city.

*Using Serverless Functions:*

These serverless functions will be responsible for securely managing user access, obtaining and refreshing OAuth2 tokens, and ensuring the security of interactions between your React application and the Google Calendar API. The serverless architecture offers benefits such as easy scalability, efficient resource utilization, and cost-effectiveness, as you only pay for the actual execution of functions rather than maintaining a dedicated server infrastructure.
