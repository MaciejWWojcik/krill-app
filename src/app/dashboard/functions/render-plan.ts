import { Plan } from '../../models/plan';
import { daysDiff } from '../../shared/functions/date-utils';

export class RenderPlanManager {

  public get dayViewSize(): number {
    return this.daySize;
  }

  public get startView(): Date {
    const today = new Date();
    return today.getTime() < this.plans[0].date.getTime() ? today : this.plans[0].date;
  }

  public get endView(): Date {
    const twoMonthsFromToday = new Date(new Date().getTime() + 2 * 30 * 24 * 60 * 60 * 1000);
    const lastPlan = this.plans[this.plans.length - 1];
    const lastDate = lastPlan.endDate ? lastPlan.endDate : lastPlan.date;
    return lastDate.getTime() > twoMonthsFromToday.getTime() ? lastDate : twoMonthsFromToday;
  }

  constructor(
    private readonly plans: Plan[],
    private readonly daySize: number = 36,
    private readonly offsetSize: number = 36 + 16,
  ) {
    this.plans.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  public toRender(): RenderPlan[] {
    const viewStartDate = this.startView;
    const renderPlans: RenderPlan[] = [];
    const groups: Plan[][] = this.groupPlansByDate(viewStartDate);

    groups.forEach(group => {
      group.forEach((plan, index) => {
        const start = daysDiff(plan.date, viewStartDate);
        const end = daysDiff(plan.endDate ?? plan.date, viewStartDate)
        const renderPlan = new RenderPlan(
          plan,
          this.daySize * start,
          this.daySize * end + this.daySize,
          this.offsetSize * index,
        );
        renderPlans.push(renderPlan);
      })
    });

    return renderPlans;
  }

  private groupPlansByDate(viewStartDate: Date): Plan[][] {
    const joinedPlans: Plan[][] = [];
    let currentRange: Plan[] = [];
    let currentEnd = 0;

    for (let i = 0; i < this.plans.length; i++) {
      const plan = this.plans[i];
      const rangeStart = daysDiff(plan.date, viewStartDate);
      const rangeEnd = daysDiff(plan.endDate ?? plan.date, viewStartDate);

      if (rangeStart > currentEnd) {
        if (currentRange.length > 0) {
          joinedPlans.push(currentRange);
        }
        currentRange = [plan];
      } else {
        currentRange.push(plan);
      }
      currentEnd = Math.max(rangeEnd, currentEnd);
    }
    joinedPlans.push(currentRange);
    return joinedPlans;
  }

}

export class RenderPlan {
  constructor(
    public readonly plan: Plan,
    public readonly start: number,
    public readonly end: number,
    public readonly offset: number,
  ) {
  }
}
