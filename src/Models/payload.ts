export type payloadType = {
  id?: number;
  title: string;
  eventType?: string;
  description?: string;
  start: Date | string;
  end: Date | string;
  calendar_id?: number;
  allDay?: boolean;
};
