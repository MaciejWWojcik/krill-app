import { EventType } from './event-type';
import { EventTimeType } from './event-time-type';
import { Priority } from './priority';
import { Occurrence } from './occurrence';

export interface CreatePlan {
  title: string;
  icon: string;
  type: EventType;
  timeType: EventTimeType;
  priority: Priority;
  date: string;
  description: string;
  categories: any[];

  // optional properties
  endDate?: string;
  occurrence?: Occurrence;
}
