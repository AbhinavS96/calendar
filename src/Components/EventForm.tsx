import { ToggleButton, TextField, ToggleButtonGroup } from "@mui/material";
import Modal from "@mui/material/Modal";
import { DatePicker } from "@mui/x-date-pickers";
import React, { FormEvent, useState } from "react";
import dayjs from "dayjs";

const EventForm: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };
  const onCloseHandler = () => {
    setEventType("event");
    onClose();
  };
  const [titleData, setTitleData] = useState("");
  const [eventType, setEventType] = useState("event");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const toggleHandler = (
    event: React.MouseEvent<HTMLElement>,
    newEventType: string
  ) => {
    setEventType(newEventType);
  };
  console.log(titleData, eventType, fromDate, toDate, description);
  return (
    <Modal open={open} onClose={onCloseHandler}>
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
          <DatePicker
            label="from"
            slotProps={{ textField: { size: "small" } }}
            value={dayjs(fromDate)}
            onChange={(newDate) => {
              if (newDate) setFromDate(newDate.toDate());
            }}
          />
          <DatePicker
            label="to"
            slotProps={{ textField: { size: "small" } }}
            value={dayjs(toDate)}
            onChange={(newDate) => {
              if (newDate) setToDate(newDate.toDate());
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
        </form>
      </div>
    </Modal>
  );
};

export default EventForm;
