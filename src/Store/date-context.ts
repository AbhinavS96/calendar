import React from "react";

const DateContext = React.createContext<{
  selectedDate: Date;
  setSelectedDate: (a: Date) => void;
}>({
  selectedDate: new Date(),
  setSelectedDate: (newDate) => {},
});
export default DateContext;
