import React, { useContext, useState } from "react";
import { Calendar, Views, dayjsLocalizer, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import dateContext from "../Store/date-context";
import EventForm from "./EventForm";
import { Modal } from "@mui/material";
import eventsContext from "../Store/events-context";
import { form } from "../Models/form";

//localizer for the calendar is dayjs. This is the same as the one for MUI date components.
const localizer = dayjsLocalizer(dayjs);

const intialFormState: form = {
  title: "",
  eventType: "event",
  description: "",
  fromDate: new Date(),
  toDate: new Date(),
  singleDate: new Date(),
  fromTime: new Date(),
  toTime: new Date(),
  allDay: true,
  priority: 1,
};

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
  const { selectedDate, setSelectedDate } = useContext(dateContext);
  const { events } = useContext(eventsContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(intialFormState);

  const selectSlotHandler = (event: any) => {
    const fromDate = new Date(event.slots[0]);
    const toDate = new Date(event.slots.slice(-1)[0]);
    toDate.setSeconds(1);
    setFormData((prevData) => {
      return {
        ...prevData,
        fromDate: fromDate,
        toDate: toDate,
        singleDate: fromDate,
      };
    });
    setModalOpen(true);
    console.log(events);
  };

  const onSelectHandler = (event: any) => {
    setFormData((prev) => {
      return {
        ...prev,
        title: event.title,
        eventType: event.eventType ? event.eventType : prev.eventType,
        fromDate: event.start,
        toDate: event.end,
        id: event.id,
        description: event.description,
        allDay: event.allDay,
        singleDate: event.start,
        fromTime: event.start,
        toTime: event.end,
        priority: event.priority,
      };
    });
    setModalOpen(true);
  };

  const modal = (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        setFormData(intialFormState);
      }}
    >
      <div>
        <EventForm
          closeHandler={() => {
            setModalOpen(false);
            setFormData(intialFormState);
          }}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </Modal>
  );

  const eventStyleGetter = (event: any) => {
    let backgroundColor = "";

    if (event.eventType === "event") {
      backgroundColor = "blue";
    } else if (event.eventType === "task") {
      backgroundColor = "green";
    } else if (event.eventType === "reminder") {
      backgroundColor = "red";
    }

    return {
      style: {
        backgroundColor,
      },
    };
  };

  const calendar = (
    <Calendar
      localizer={localizer}
      events={events}
      eventPropGetter={eventStyleGetter}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectEvent={(event) => {
        onSelectHandler(event);
      }}
      onSelectSlot={selectSlotHandler}
      date={selectedDate}
      onNavigate={(newDate) => {
        setSelectedDate(newDate);
      }}
      selectable
      views={[Views.DAY, Views.WEEK, Views.MONTH]}
      view={view}
      onView={(a) => {
        setView(a);
      }}
    />
  );

  return (
    <div className="big-container">
      <div className="big-wrapper">
        {calendar}
        {modal}
      </div>
    </div>
  );
};

export default BigCalendar;
