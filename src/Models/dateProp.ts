export type dateProp = {
  fromDate: Date;
  setFromDate: React.Dispatch<React.SetStateAction<Date>>;
  toDate: Date;
  setToDate: React.Dispatch<React.SetStateAction<Date>>;
  singleDate: Date;
  setSingleDate: React.Dispatch<React.SetStateAction<Date>>;
  fromTime: Date;
  setFromTime: React.Dispatch<React.SetStateAction<Date>>;
  toTime: Date;
  setToTime: React.Dispatch<React.SetStateAction<Date>>;
  allDay: boolean;
  setAllDay: React.Dispatch<React.SetStateAction<boolean>>;
};
