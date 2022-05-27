import { EventType } from './event-type';
import { EventTimeType } from './event-time-type';
import { Priority } from './priority';
import { Occurrence } from './occurrence';

export const formatPlan = (plan: Plan): Plan => {
  return {
    ...plan,
    date: new Date(plan.date),
    endDate: plan.endDate ? new Date(plan.endDate) : undefined,
  }
}

export interface Plan {
  id: string;
  title: string;
  icon: string;
  type: EventType;
  timeType: EventTimeType;
  priority: Priority;
  date: Date;
  description: string;
  categories: any[];

  // optional properties
  endDate?: Date;
  occurrence?: Occurrence;
}
