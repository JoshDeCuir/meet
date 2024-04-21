import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  // SCENARIO 1
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    let AppComponent;

    given("the user first opens the app", () => {
      AppComponent = render(<App />);
    });

    when("the user recieves the full list of events", async () => {
      await waitFor(() => {
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    then("all events will collapse by default.", () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector(".details");
      expect(details).not.toBeInTheDocument();
    });
  });

  // SCENARIO 2
  test("User can expand an event to see its details", ({ given, when, then }) => {
    let AppComponent;
    let button;

    given("the user gets a list of events", async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        const AppDOM = AppComponent.container.firstChild;
        const eventList = within(AppDOM).queryAllByRole("listitem");
        expect(eventList[0]).toBeTruthy();
      });
    });

    when("a user selects an event's details", async () => {
      const firstEvent = within(
        AppComponent.container.firstChild
      ).queryAllByRole("listitem")[0];
      button = within(firstEvent).queryByText("Show Details");
      await userEvent.click(button);
    });

    then("the details will show up for that chosen event", async () => {
      await waitFor(() => {
        const firstEvent = within(
          AppComponent.container.firstChild
        ).queryAllByRole("listitem")[0];
        const details = within(firstEvent).queryByText("Hide Details");
        expect(details).toBeInTheDocument();
      });
    });
  });

  // SCENARIO 3
  test("User can collapse an event to hide its details", ({ given, when, then}) => {
    let AppComponent;
    let button;

    given("the user sees the details of an event", async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        const AppDOM = AppComponent.container.firstChild;
        const eventList = within(AppDOM).queryAllByRole("listitem");
        expect(eventList[0]).toBeTruthy();
      });
      const firstEvent = within(
        AppComponent.container.firstChild
      ).queryAllByRole("listitem")[0];
      const button = within(firstEvent).queryByText("Show Details");
      await userEvent.click(button);
    });

    when("the user presses a button to hide event's details", async () => {
      const EventComponent = AppComponent.container.firstChild;
      button = within(EventComponent).queryByText("Hide Details");
      await userEvent.click(button);
    });

    then("the details of that event will be hidden", async () => {
      await waitFor(() => {
        const EventComponent = AppComponent.container.firstChild;
        const details = within(EventComponent).queryByText("Hide Details");
        expect(details).not.toBeInTheDocument();
      });
    });
  });
});