import {
  ToggleButton,
  TextField,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import React, { FormEvent, useState, useContext, useReducer } from "react";
import EventDate from "./EventDate";
import { payloadType } from "../Models/payload";
import eventsContext from "../Store/events-context";
import styles from "./EventForm.module.css";
import { form } from "../Models/form";

/**
 * The popup form to add a new event.
 * Keeps all data in state variables and uses context to update the events
 */

const EventForm: React.FC<{
  closeHandler: () => void;
  formData: form;
  setFormData: React.Dispatch<React.SetStateAction<form>>;
}> = ({ closeHandler, formData, setFormData }) => {
  const { events, setEvents } = useContext(eventsContext);
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    let payload: payloadType = {
      title: formData.title,
      eventType: formData.eventType,
      description: formData.description,
      start: formData.fromDate,
      end: formData.toDate,
    };
    setEvents([...events, payload]);
    console.log(events);
    closeHandler();
  };

  const toggleHandler = (
    event: React.MouseEvent<HTMLElement>,
    newEventType: string | null
  ) => {
    if (newEventType)
      setFormData((prev) => {
        return { ...prev, eventType: newEventType };
      });
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
            value={formData.title}
            onChange={(e) => {
              setFormData((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
            fullWidth
          />
        </div>

        <div className={styles.toggleButtonContainer}>
          <ToggleButtonGroup
            size="small"
            value={formData.eventType}
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
            fromDate: formData.fromDate,
            toDate: formData.toDate,
            singleDate: formData.singleDate,
            fromTime: formData.fromTime,
            toTime: formData.toTime,
            allDay: formData.allDay,
            setFormData: setFormData,
          }}
        />
        <div className={styles.descriptionContainer}>
          <TextField
            variant="outlined"
            label="Description"
            error={false}
            size="small"
            multiline
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, description: e.target.value };
              })
            }
            fullWidth
          />
        </div>
        <div className={styles.buttonContainer}>
          <div>
            <Button
              variant="text"
              onClick={() => {
                closeHandler();
              }}
              className={styles.button}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" className={styles.button}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
