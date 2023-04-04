import Modal from "@mui/material/Modal";
import React, { FormEvent } from "react";

const EventForm: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className="event-container">
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="Event title" />
          <br></br>
          <input type="date" name="start" />
          <input type="date" name="end" />
        </form>
      </div>
    </Modal>
  );
};

export default EventForm;
