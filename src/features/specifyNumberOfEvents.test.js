import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  // SCENARIO 1
  test("When user hasn't specified a number the default number is 32", ({ given, when, then }) => {
    let AppComponent;

    given("the user hasn't picked or filtered the number of events", () => {
      AppComponent = render(<App />);
    });

    when('the user sees the list of events', async () => {
      await waitFor(() => {
        const eventList = within(AppComponent.container).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });
    });

    then('events are shown by default', async () => {
      const eventList = within(AppComponent.container).queryAllByRole('listitem');
      expect(eventList.length).toEqual(32);
    });
  });

  // SCENARIO 2
  test('User can change the number of events they want to see.', ({ given, when, then }) => {
    let AppComponent;
    let selectedNumberOfEvents;

    given('the user has events displayed', async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        const eventList = within(AppComponent.container).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });
    });

    when('the user chooses to change the number of events displayed', async () => {
      const numberOfEventsInput = AppComponent.container.querySelector('.number-of-events-input');

      await userEvent.clear(numberOfEventsInput);
      await userEvent.type(numberOfEventsInput, '10');

      selectedNumberOfEvents = 10; // Capture the selected number of events
    });

    then('the number of events displayed will update to the number the user selected', async () => {
      await waitFor(() => {
        const eventList = within(AppComponent.container).queryAllByRole('listitem');
        expect(eventList.length).toEqual(selectedNumberOfEvents);
      });
    });
  });
});


