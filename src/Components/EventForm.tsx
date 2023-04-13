import {
  ToggleButton,
  TextField,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import React, { FormEvent, useState, useContext } from "react";
import EventDate from "./EventDate";
import { payloadType } from "../Models/payload";
import eventsContext from "../Store/events-context";
import styles from "./EventForm.module.css";

/**
 * The popup form to add a new event.
 * Keeps all data in state variables and uses context to update the events
 */
const EventForm: React.FC<{ closeHandler: () => void }> = ({
  closeHandler,
}) => {
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("event");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [singleDate, setSingleDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [allDay, setAllDay] = useState(true);
  const { events, setEvents } = useContext(eventsContext);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    let payload: payloadType = {
      title,
      eventType,
      description,
      start: fromDate,
      end: toDate,
    };
    setEvents([...events, payload]);
    closeHandler();
  };

  const toggleHandler = (
    event: React.MouseEvent<HTMLElement>,
    newEventType: string
  ) => {
    setEventType(newEventType);
  };

  return (
    <div className={styles.eventContainer}>
      <form onSubmit={submitHandler}>
        <div className={styles.titleContainer}>
          <TextField
            variant="outlined"
            label="Add title and time"
            error={false}
            size="small"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth
          />
        </div>

        <div className={styles.toggleButtonContainer}>
          <ToggleButtonGroup
            size="small"
            value={eventType}
            onChange={toggleHandler}
            exclusive
          >
            <ToggleButton value="event">Event</ToggleButton>
            <ToggleButton value="task">Task</ToggleButton>
            <ToggleButton value="reminder">Reminder</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <EventDate
          dateInfo={{
            fromDate,
            setFromDate,
            toDate,
            setToDate,
            singleDate,
            setSingleDate,
            fromTime,
            setFromTime,
            toTime,
            setToTime,
            allDay,
            setAllDay,
          }}
        />
        <TextField
          variant="outlined"
          label="Description"
          error={false}
          size="small"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="text"
          onClick={() => {
            closeHandler();
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default EventForm;
