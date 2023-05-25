import {
  ToggleButton,
  TextField,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import React, { FormEvent, useContext } from "react";
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
  console.log(formData.fromDate);
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    let payload: payloadType = {
      title: formData.title,
      eventType: formData.eventType,
      description: formData.description,
      start: formData.fromDate.toLocaleString("be", { timeZoneName: "short" }),
      end: formData.toDate.toLocaleString("be", { timeZoneName: "short" }),
      calendar_id: 1,
      allDay: formData.allDay,
    };
    if (!formData.allDay) {
      const combinedStart = new Date(formData.singleDate);
      const combinedEnd = new Date(formData.singleDate);
      combinedStart.setHours(formData.fromTime.getHours());
      combinedStart.setMinutes(formData.fromTime.getMinutes());
      combinedStart.setSeconds(formData.fromTime.getSeconds());
      combinedStart.setMilliseconds(formData.fromTime.getMilliseconds());
      combinedEnd.setHours(formData.toTime.getHours());
      combinedEnd.setMinutes(formData.toTime.getMinutes());
      combinedEnd.setSeconds(formData.toTime.getSeconds());
      combinedEnd.setMilliseconds(formData.toTime.getMilliseconds());
      console.log(combinedStart);
      console.log(combinedEnd);
      payload = { ...payload, start: combinedStart, end: combinedEnd };
    }
    let URL = "http://127.0.0.1:5000/add_event";
    if (formData.id) {
      payload = { ...payload, id: formData.id };
      URL = "http://127.0.0.1:5000/update_event";
    }

    console.log(payload);
    (async () => {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.status == 200) {
        let result = await response.json();
        result = {
          ...result,
          start: result.fromDate,
          end: result.toDate,
        };
        if (result.id) {
          console.log(result);
          setEvents(
            events.map((event: payloadType) =>
              event.id === result.id ? result : event
            )
          );
        } else {
          console.log(result);
          setEvents([...events, result]);
        }
        closeHandler();
      } else {
        console.log("error");
      }
    })();
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
