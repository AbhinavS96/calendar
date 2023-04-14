import React, { useState } from "react";
import "./App.css";
import { Views, View } from "react-big-calendar";
import dateContext from "./Store/date-context";
import BigCalendar from "./Components/BigCalendar";
import SmallCalendar from "./Components/SmallCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

/**
 * The base component. Keeps the selected date state and calendar view state
 */
function App() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.MONTH);

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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SmallCalendar setView={setView} />
            <BigCalendar view={view} setView={setView} />
          </LocalizationProvider>
        </div>
      </main>
    </dateContext.Provider>
  );
}

export default App;
