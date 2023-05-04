import { form } from "./form";

export type dateProp = {
  fromDate: Date;
  toDate: Date;
  singleDate: Date;
  fromTime: Date;
  toTime: Date;
  allDay: boolean;
  setFormData: React.Dispatch<React.SetStateAction<form>>;
};
