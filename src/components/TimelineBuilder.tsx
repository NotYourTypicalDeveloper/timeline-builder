import { useState, useRef } from "react";
import TimelineArray from "./TimelineArray.tsx";
import TimelineCard from "./TimelineCard.tsx";

export interface IEventsProps {
  text: string;
  id: number;
}
const TimelineBuilder: React.FC = () => {
  const [events, setEvents] = useState<IEventsProps[]>([]);
  const [newEvent, setNewEvent] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);
  const addInputRef = useRef();

  // User clicks "Add" button
  const handleAddEvent = () => {
    if (newEvent.trim() !== "") {
      setEvents([...events, { text: newEvent, id: Date.now() }]);
      setNewEvent("");
      setShowAddInput(!showAddInput);
    }
  };

  // User press enter to add element
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setEvents([...events, { text: e.target.value, id: Date.now() }]);
      setShowAddInput(false);
      addInputRef.current.value = "";
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
    setShowAddInput(!showAddInput);
  };

  return (
    <div>
      <h1>Timeline Builder</h1>
      <p>Click on the timeline to add an event</p>
      {showAddInput && (
        <div className="add-input-wrapper">
          <input
            type="text"
            placeholder="Enter event description"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            onKeyDown={handleKeyPress}
            ref={addInputRef}
          />
          <button className="action-button" onClick={handleAddEvent}>
            Add Event
          </button>
        </div>
      )}
      <div className="timeline-bar" onClick={handleTimelineClick}>
        <div className="timeline-element-ctnr">
          {events.map((event) => (
            <TimelineCard
              key={event.id}
              eventItem={event}
              handleEditEvent={handleEditEvent}
              handleDeleteEvent={handleDeleteEvent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineBuilder;
