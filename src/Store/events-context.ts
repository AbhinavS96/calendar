import React from "react";
import { payloadType } from "../Models/payload";

const eventsContext = React.createContext<{
  events: payloadType[];
  setEvents: (events: payloadType[]) => void;
}>({
  events: [
    {
      id: 1,
      title: "Soniya's bad day",
      eventType: "event",
      start: new Date(2023, 2, 30),
      end: new Date(2023, 2, 30),
    },
    {
      id: 2,
      title: "SEES project submission",
      eventType: "event",
      start: new Date(2023, 2, 31),
      end: new Date(2023, 2, 31),
    },
  ],
  setEvents: (events) => {},
});
export default eventsContext;
