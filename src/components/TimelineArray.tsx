import { IEventsProps } from "./TimelineBuilder.tsx";

interface ITimelineElementProps {
  eventsArr: IEventsProps[];
  handleEditEvent: (index: number, newText: string) => void;
  handleDeleteEvent: (index: number) => void;
}

const TimelineArray: React.FC<ITimelineElementProps> = ({
  eventsArr,
  handleEditEvent,
  handleDeleteEvent,
}) => {
  return (
    <div className="timeline-element-wrapper">
      {eventsArr.map((event) => (
        <div className="event" key={event.id}>
          <div className="dot" />
          <div>{event.text}</div>
          <div className="event-actions">
            <button
              onClick={() =>
                handleEditEvent(event.id, prompt("Edit event:", event.text))
              }
            >
              Edit
            </button>

            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineArray;
