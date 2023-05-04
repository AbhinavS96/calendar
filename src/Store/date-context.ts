import React from "react";

const dateContext = React.createContext<{
  selectedDate: Date;
  setSelectedDate: (a: Date) => void;
}>({
  selectedDate: new Date(),
  setSelectedDate: (newDate) => {},
});
export default dateContext;
