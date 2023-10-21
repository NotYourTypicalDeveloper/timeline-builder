import { useState, useRef } from "react";
import TimelineArray from "./TimelineArray.tsx";

export interface IEventsProps {
  text: string;
  id: number;
}
const TimelineBuilder: React.FC = () => {
  const [events, setEvents] = useState<IEventsProps[]>([]);
  const [newEvent, setNewEvent] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef();

  const handleAddEvent = () => {
    if (newEvent.trim() !== "") {
      setEvents([...events, { text: newEvent, id: Date.now() }]);
      setNewEvent("");
      setShowAddInput(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setEvents([...events, { text: e.target.value, id: Date.now() }]);
      inputRef.current.value = "";
    }
  };
  const handleEditEvent = (id: number, newText: string) => {
    const updatedList = events.map((elem) => {
      if (elem.id === id) {
        elem.text = newText;
      }

      return elem;
    });

    setEvents(updatedList);
  };

  // delete item
  const handleDeleteEvent = (id: number) => {
    const filter = events.filter((elem) => elem.id !== id);
    setEvents(filter);
  };
  const handleTimelineClick = () => {
    setShowAddInput(true);
  };

  return (
    <div>
      <h1>Timeline Builder</h1>
      {showAddInput && (
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter event description"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            onKeyDown={handleKeyPress}
            ref={inputRef}
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      )}
      editmode: {editMode}
      showAddInput : {showAddInput.toString()}
      <div className="timeline-bar" onClick={handleTimelineClick}>
        <TimelineArray
          eventsArr={events}
          handleEditEvent={handleEditEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>
    </div>
  );
};

export default TimelineBuilder;
