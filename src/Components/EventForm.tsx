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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ReactComponent as DeleteLogo } from "../assets/delete.svg";

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
      payload = { ...payload, start: combinedStart, end: combinedEnd };
    }
    if (formData.eventType == "task") {
      payload.priority = formData.priority;
    }
    let URL = "http://127.0.0.1:5000/add_event";
    if (formData.id) {
      payload = { ...payload, id: formData.id };
      URL = "http://127.0.0.1:5000/update_event";
    }
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
          start: new Date(result.start),
          end: new Date(result.end),
        };
        if (payload.id) {
          setEvents(
            events.map((event: payloadType) =>
              event.id === result.id ? result : event
            )
          );
        } else {
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

  const deleteHandler = () => {
    (async () => {
      const response = await fetch("http://127.0.0.1:5000/delete_event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.id,
          eventType: formData.eventType,
        }),
      });
      if (response.status == 200) {
        setEvents(events.filter((event) => event.id != formData.id));
        closeHandler();
      } else {
        console.log("error");
      }
    })();
    closeHandler();
  };

  return (
    <div className={styles.eventContainer}>
      {formData.id && (
        <div className={styles.deleteContainer}>
          <Button variant="text" onClick={deleteHandler} id="deleteButton">
            {<DeleteLogo />}
          </Button>
        </div>
      )}
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
        {formData.eventType == "task" && (
          <div className={styles.priorityContainer}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl size="small">
                <InputLabel id="priority-select-label">User</InputLabel>
                <Select
                  id="priority-select"
                  value={formData.priority ? `${formData.priority}` : "1"}
                  label="User"
                  onChange={(event) => console.log(event.target.value)}
                >
                  <MenuItem value="1"> Low</MenuItem>
                  <MenuItem value="2"> Medium</MenuItem>
                  <MenuItem value="3"> High</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        )}
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
