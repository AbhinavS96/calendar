import React, { useContext } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import dateContext from "../Store/date-context";
import { View, Views } from "react-big-calendar";

/**
 * The small calendar that is rendered on the left side.
 * Accepts the view change handler as a prop
 * Taps into the date context to keep date state.
 */
const SmallCalendar: React.FC<{ setView: (view: View) => void }> = ({
  setView,
}) => {
  const { selectedDate, setSelectedDate } = useContext(dateContext);
  return (
    <div className="small-container">
      <div className="small-wrapper">
        <DateCalendar
          value={dayjs(selectedDate)}
          onChange={(date) => {
            if (date) {
              setSelectedDate(date.toDate());
              setView(Views.DAY);
            }
          }}
          sx={{ padding: 0, margin: 0, width: 1 }}
        />
      </div>
    </div>
  );
};

export default SmallCalendar;
