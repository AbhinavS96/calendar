import React, { useState } from "react";
import "./App.css";
import { Views, View } from "react-big-calendar";
import dateContext from "./Store/date-context";
import BigCalendar from "./Components/BigCalendar";
import SmallCalendar from "./Components/SmallCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UserSelect from "./Components/UserSelect";
import { payloadType } from "./Models/payload";
import eventsContext from "./Store/events-context";

/**
 * The base component. Keeps the selected date state and calendar view state
 */
function App() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.MONTH);
  const [events, setEvents] = useState<payloadType[] | []>([]);

  return (
    <dateContext.Provider
      value={{
        selectedDate: date,
        setSelectedDate: setDate,
      }}
    >
      <header></header>
      <main>
        <div className="App">
          <eventsContext.Provider
            value={{
              events: events,
              setEvents: setEvents,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="small-container">
                <div className="small-wrapper">
                  <SmallCalendar setView={setView} />
                  <UserSelect />
                </div>
              </div>
              <BigCalendar view={view} setView={setView} />
            </LocalizationProvider>
          </eventsContext.Provider>
        </div>
      </main>
    </dateContext.Provider>
  );
}

export default App;
