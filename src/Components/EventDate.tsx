import React, { useState } from "react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Checkbox, FormControlLabel } from "@mui/material";

const EventDate: React.FC = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [singleDate, setSingleDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [allDay, setAllDay] = useState(true);
  console.log(allDay);

  const multiDayPicker = (
    <>
      <DatePicker
        label="From"
        slotProps={{ textField: { size: "small" } }}
        value={dayjs(fromDate)}
        onChange={(newDate) =>
          newDate ? setFromDate(newDate.toDate()) : new Date()
        }
      />
      <DatePicker
        label="To"
        slotProps={{ textField: { size: "small" } }}
        value={dayjs(toDate)}
        onChange={(newDate) =>
          newDate ? setToDate(newDate.toDate()) : new Date()
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
          newDate ? setSingleDate(newDate.toDate()) : new Date()
        }
      />
      <TimePicker
        label="to"
        slotProps={{ textField: { size: "small" } }}
        value={dayjs(toTime)}
        onChange={(newTime) =>
          newTime ? setToTime(newTime.toDate()) : new Date()
        }
      />
      <TimePicker
        label="from"
        slotProps={{ textField: { size: "small" } }}
        value={dayjs(fromTime)}
        onChange={(newTime) =>
          newTime ? setFromTime(newTime.toDate()) : new Date()
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAllDay(e.target.checked)
            }
          />
        }
        label="All day"
      />
    </>
  );
};

export default EventDate;
