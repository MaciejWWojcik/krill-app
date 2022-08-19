import { Flavor } from '../util/flavor';
import { formatPlan, Plan } from './plan';

export type ScheduleId = Flavor<string, 'ScheduleId'>;

export interface Schedule {
  scheduleId: ScheduleId;
  title: string | null;
  events: Plan[];
}

export const formatSchedule = (schedule: Schedule): Schedule => ({
  ...schedule,
  events: (schedule.events ?? []).map(formatPlan),
})
