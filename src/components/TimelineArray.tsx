import { useState } from "react";
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
  const [edit, setEdit] = useState(false);
  // const [editText, setEditText] = useState(text);

  return (
    <div className="timeline-element-ctnr">
      {eventsArr.map((event) => (
        <div className="timeline-event-wrapper" key={event.id}>
          <div className="dot" />
          <div>
            {edit ? (
              <input
                className="edit-input"
                type="text"
                value={event.text}
                onChange={(e) => {
                  handleEditEvent(event.id, e.target.value);
                }}
                onBlur={() => {
                  setEdit(false);
                  handleEditEvent(event.id, event.text);
                }}
              />
            ) : (
              <div>{event.text}</div>
            )}
            <div
              onDoubleClick={() => {
                setEdit(true);
                handleEditEvent(event.id, event.text);
              }}
              className="action-buttons-wrapper"
            >
              <button
                className="action-button"
                onClick={() => {
                  setEdit(true);
                  handleEditEvent(event.id, event.text);
                }}
              >
                edit
              </button>

              <button
                className="action-button"
                onClick={() => handleDeleteEvent(event.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineArray;
