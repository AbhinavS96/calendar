import { form } from "./form";

export type dateProp = {
  fromDate: Date;
  toDate: Date;
  singleDate: Date;
  setSingleDate: React.Dispatch<React.SetStateAction<Date>>;
  fromTime: Date;
  setFromTime: React.Dispatch<React.SetStateAction<Date>>;
  toTime: Date;
  setToTime: React.Dispatch<React.SetStateAction<Date>>;
  allDay: boolean;
  setAllDay: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<form>>;
};
