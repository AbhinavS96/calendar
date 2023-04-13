import {
  ToggleButton,
  TextField,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import React, { FormEvent, useState } from "react";
import EventDate from "./EventDate";

const EventForm: React.FC<{ closeHandler: () => void }> = ({
  closeHandler,
}) => {
  const [titleData, setTitleData] = useState("");
  const [eventType, setEventType] = useState("event");
  const [description, setDescription] = useState("");

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log("click");
    closeHandler();
  };

  const toggleHandler = (
    event: React.MouseEvent<HTMLElement>,
    newEventType: string
  ) => {
    setEventType(newEventType);
  };
  console.log(titleData, eventType, description);

  return (
    <div className="event-container">
      <form onSubmit={submitHandler}>
        <TextField
          variant="outlined"
          label="Add title and time"
          error={false}
          size="small"
          value={titleData}
          onChange={(e) => {
            setTitleData(e.target.value);
          }}
          fullWidth
        />
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
        <EventDate />
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
