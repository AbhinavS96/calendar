import React, { useContext } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import DateContext from "../Store/date-context";
import { View, Views } from "react-big-calendar";

const SmallCalendar: React.FC<{ setView: (view: View) => void }> = ({
  setView,
}) => {
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  return (
    <div className="small-container">
      <DateCalendar
        value={dayjs(selectedDate)}
        onChange={(date) => {
          if (date) {
            setSelectedDate(date.toDate());
            setView(Views.DAY);
          }
        }}
      />
    </div>
  );
};

export default SmallCalendar;
