import React, { useContext, useState } from "react";
import { Calendar, Views, dayjsLocalizer, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import DateContext from "../Store/date-context";
import EventForm from "./EventForm";
import { Modal } from "@mui/material";

//localizer for the calendar is dayjs. This is the same as the one for MUI date components.
const localizer = dayjsLocalizer(dayjs);
//dummy data
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

/**
 * The big calendar component.
 * Accepts the default view (month) as props and the function to update the view as props
 * Also holds the modal component that is portalled outside automatically by MUI
 * Modal state is managed inside this component.
 * Date context is used for tapping into date state
 */
const BigCalendar: React.FC<{ view: View; setView: (view: View) => void }> = ({
  view,
  setView,
}) => {
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="big-container">
      <Calendar
        localizer={localizer}
        events={event}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={() => console.log("event")}
        onSelectSlot={() => setModalOpen(true)}
        date={selectedDate}
        onNavigate={(newDate) => {
          setSelectedDate(newDate);
        }}
        selectable
        views={[Views.DAY, Views.WEEK, Views.MONTH]}
        view={view}
        onView={(a) => {
          console.log(a);
          setView(a);
        }}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <EventForm closeHandler={() => setModalOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default BigCalendar;
