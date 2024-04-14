import { render } from "@testing-library/react";
import moment from 'moment';
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";

describe('<Event /> component', () => {
  
  let EventComponent;
  beforeEach(() => {
    EventComponent = render(<Event event={allEvents[0]} />);
  });
  
  let allEvents;
  beforeAll(async () => {
    allEvents = await getEvents();
  })

  test('renders event title', () => {
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test('renders event start time', () => {
    var formattedDate = moment(allEvents[0].created).format('MMMM Do YYYY, h:mm:ss a');
    expect(EventComponent.queryByText(formattedDate)).toBeInTheDocument();
  });

  test('renders event location', () => {
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test('event details are hidden by default', () => {
    expect(EventComponent.queryByTestId('.details')).not.toBeInTheDocument();
  });

  test("renders event details when user clicks 'show details' button", async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByRole('button');
    await user.click(button, 'Show Details');
    const details = EventComponent.container.querySelector('.details')
    expect(details).toBeInTheDocument();
  });

  test("hides event details when user clicks 'hide details' button", async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByRole('button');
    const details = EventComponent.container.querySelector('.details')
    await user.click(button, 'Hide Details');
    expect(details).not.toBeInTheDocument();
  });

});
