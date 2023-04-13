import React from "react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Checkbox, FormControlLabel } from "@mui/material";
import { dateProp } from "../Models/dateProp";

/**
 * Component renders either a date range selection or a single day with time selection
 * based on the user's choice
 * All values are stored in separate state variables passed down via props
 */
const EventDate: React.FC<{ dateInfo: dateProp }> = ({ dateInfo }) => {
  const {
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
  } = dateInfo;
  const multiDayPicker = (
    <>
      <DatePicker
        label="From"
        slotProps={{ textField: { size: "small" } }}
        value={dayjs(fromDate)}
        onChange={(newDate) => {
          newDate ? setFromDate(newDate.toDate()) : setFromDate(new Date());
        }}
      />
      <DatePicker
        label="To"
        slotProps={{ textField: { size: "small" } }}
        value={dayjs(toDate)}
        onChange={(newDate) =>
          newDate ? setToDate(newDate.toDate()) : setToDate(new Date())
        }
      />
    </>
  );
  const singleDayDatePicker = (
    <>
      <DatePicker
        label="On"
        slotProps={{ textField: { size: "small" } }}
        value={dayjs(singleDate)}
        onChange={(newDate) =>
          newDate ? setSingleDate(newDate.toDate()) : setSingleDate(new Date())
        }
      />
      <TimePicker
        label="from"
        slotProps={{ textField: { size: "small" } }}
        value={dayjs(fromTime)}
        onChange={(newTime) =>
          newTime ? setFromTime(newTime.toDate()) : setFromTime(new Date())
        }
      />
      <TimePicker
        label="to"
        slotProps={{ textField: { size: "small" } }}
        value={dayjs(toTime)}
        onChange={(newTime) =>
          newTime ? setToTime(newTime.toDate()) : setToTime(new Date())
        }
      />
    </>
  );

  return (
    <>
      {allDay ? multiDayPicker : singleDayDatePicker}
      <FormControlLabel
        control={
          <Checkbox
            checked={allDay}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAllDay(e.target.checked);
            }}
          />
        }
        label="All day"
      />
    </>
  );
};

export default EventDate;
