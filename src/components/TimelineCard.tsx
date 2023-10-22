import { useState } from "react";

interface ITimelineCardProps {
  eventItem: {
    text: string;
    id: number;
  };
  handleEditEvent: (index: number, newText: string) => void;
  handleDeleteEvent: (index: number) => void;
}

const TimelineCard: React.FC<ITimelineCardProps> = ({
  eventItem,
  handleEditEvent,
  handleDeleteEvent,
}) => {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(eventItem.text);

  const handleBlur = () => {
    setEdit(false);
    handleEditEvent(eventItem.id, editText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setEdit(false);
      handleEditEvent(eventItem.id, editText);
    }
  };

  return (
    <div className="timeline-event-wrapper" key={eventItem.id}>
      <div>
        <div className="dot" />
        {edit ? (
          <input
            className="edit-input"
            type="text"
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
            }}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
          />
        ) : (
          <div
            onDoubleClick={() => {
              setEdit(true);
            }}
          >
            {eventItem.text}
          </div>
        )}
        <div className="action-buttons-wrapper">
          <button
            className="action-button"
            onClick={() => {
              setEdit(true);
            }}
          >
            edit
          </button>

          <button
            className="action-button"
            onClick={() => handleDeleteEvent(eventItem.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
