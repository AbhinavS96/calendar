import React, { useContext, useEffect, useState } from "react";
import { Calendar, Views, dayjsLocalizer, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import dateContext from "../Store/date-context";
import EventForm from "./EventForm";
import { Modal } from "@mui/material";
import eventsContext from "../Store/events-context";
import { payloadType } from "../Models/payload";
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
  const [events, setEvents] = useState<payloadType[] | []>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(intialFormState);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:5000/get_events");
      const result = await response.json();

      let mappedResults: payloadType[] = [];
      if (Object.keys(result).length != 0) {
        mappedResults.push(
          result["events"].map((res: payloadType) => {
            return {
              ...res,
              eventType: "event",
              start: new Date(res.start),
              end: new Date(res.end),
            };
          })
        );
        mappedResults.push(
          result["tasks"].map((res: payloadType) => {
            return {
              ...res,
              eventType: "task",
              start: new Date(res.start),
              end: new Date(res.end),
            };
          })
        );
        mappedResults.push(
          result["reminders"].map((res: payloadType) => {
            return {
              ...res,
              eventType: "reminder",
              start: new Date(res.start),
              end: new Date(res.end),
            };
          })
        );
      }
      setEvents(mappedResults);
    })();
  }, []);

  const onSelectHandler = (event: payloadType) => {
    setFormData((prev) => {
      return {
        ...prev,
        title: event.title,
        eventType: event.eventType ? event.eventType : prev.eventType,
        fromDate: event.start,
        toDate: event.end,
        id: event.id,
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

  const calendar = (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectEvent={(event) => {
        onSelectHandler(event);
      }}
      onSelectSlot={() => setModalOpen(true)}
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
        <eventsContext.Provider
          value={{
            events: events,
            setEvents: setEvents,
          }}
        >
          {calendar}
          {modal}
        </eventsContext.Provider>
      </div>
    </div>
  );
};

export default BigCalendar;
