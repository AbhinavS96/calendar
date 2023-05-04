export type form = {
  id?: number;
  title: string;
  eventType: string;
  description: string;
  fromDate: Date;
  toDate: Date;
  singleDate: Date;
  fromTime: Date;
  toTime: Date;
  allDay: boolean;
};
