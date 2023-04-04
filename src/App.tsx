import React, { useState } from "react";
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { Calendar, Views, dayjsLocalizer, View } from "react-big-calendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const localizer = dayjsLocalizer(dayjs);
const event = [
  {
    id: 1,
    title: "Soniya's bad day",
    start: new Date(2023, 2, 30),
    end: new Date(2023, 2, 30),
  },
  {
    id: 2,
    title: "SEES project submission",
    start: new Date(2023, 2, 31),
    end: new Date(2023, 2, 31),
  },
];
function App() {
  const [date, setDate] = useState(
    dayjs("Tue Apr 04 2023 21:54:06 GMT+0200 (Central European Summer Time)")
  );
  const [view, setView] = useState<View>(Views.MONTH);
  //console.log(date.toDate());
  return (
    <div className="App">
      <div className="big-container">
        <Calendar
          localizer={localizer}
          events={event}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={() => console.log("event")}
          onSelectSlot={() => console.log("slot")}
          date={date.toDate()}
          onNavigate={(a) => {
            setDate(dayjs(a));
          }}
          selectable
          views={[Views.DAY, Views.WEEK, Views.MONTH]}
          view={view}
          onView={(a) => {
            console.log(a);
            setView(a);
          }}
        />
      </div>
      <div className="small-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={date}
            onChange={(date) => {
              if (date) {
                setDate(date);
                setView(Views.DAY);
              }
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default App;
