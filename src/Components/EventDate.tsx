import React from "react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Checkbox, FormControlLabel } from "@mui/material";
import { dateProp } from "../Models/dateProp";
import styles from "./EventDate.module.css";

/**
 * Component renders either a date range selection or a single day with time selection
 * based on the user's choice
 * All values are stored in separate state variables passed down via props
 */
const EventDate: React.FC<{ dateInfo: dateProp }> = ({ dateInfo }) => {
  const {
    fromDate,
    toDate,
    singleDate,
    fromTime,
    toTime,
    allDay,
    setFormData,
  } = dateInfo;
  const multiDayPicker = (
    <>
      <div className={styles.dateComponent}>
        <DatePicker
          label="From"
          slotProps={{ textField: { size: "small" } }}
          value={dayjs(fromDate)}
          onChange={(newDate) => {
            setFormData((prev) => {
              return {
                ...prev,
                fromDate: newDate ? newDate.toDate() : new Date(),
              };
            });
          }}
        />
      </div>
      <div className={styles.dateComponent}>
        <DatePicker
          label="To"
          slotProps={{ textField: { size: "small" } }}
          value={dayjs(toDate)}
          onChange={(newDate) =>
            setFormData((prev) => {
              return {
                ...prev,
                toDate: newDate ? newDate.toDate() : new Date(),
              };
            })
          }
        />
      </div>
    </>
  );
  const singleDayDatePicker = (
    <>
      <div className={styles.singleDateComponent}>
        <DatePicker
          label="On"
          slotProps={{ textField: { size: "small" } }}
          value={dayjs(singleDate)}
          onChange={(newDate) =>
            setFormData((prev) => {
              return {
                ...prev,
                singleDate: newDate ? newDate.toDate() : new Date(),
              };
            })
          }
        />
      </div>
      <div className={styles.timeComponent}>
        <TimePicker
          label="from"
          slotProps={{ textField: { size: "small" } }}
          value={dayjs(fromTime)}
          onChange={(newTime) =>
            setFormData((prev) => {
              return {
                ...prev,
                fromTime: newTime ? newTime.toDate() : new Date(),
              };
            })
          }
        />
      </div>
      <div className={styles.timeComponent}>
        <TimePicker
          label="to"
          slotProps={{ textField: { size: "small" } }}
          value={dayjs(toTime)}
          onChange={(newTime) =>
            setFormData((prev) => {
              return {
                ...prev,
                toTime: newTime ? newTime.toDate() : new Date(),
              };
            })
          }
        />
      </div>
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.dateContainer}>
          {allDay ? multiDayPicker : singleDayDatePicker}
        </div>
        <div className={styles.allDayContainer}>
          <FormControlLabel
            control={
              <Checkbox
                checked={allDay}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      allDay: !prev.allDay,
                    };
                  });
                }}
              />
            }
            label="All day"
          />
        </div>
      </div>
    </div>
  );
};

export default EventDate;
