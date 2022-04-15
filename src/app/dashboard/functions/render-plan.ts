import { Plan } from '../../models/plan';

export class RenderPlanManager {

  constructor(
    private readonly plans: Plan[],
    private readonly daySize: number = 36,
    private readonly offsetSize: number = 36 + 16,
  ) {
  }

  public toRender(): RenderPlan[] {
    this.plans.sort((a, b) => a.date.getTime() - b.date.getTime());

    const today = new Date();
    const viewStartDate = today.getTime() < this.plans[0].date.getTime() ? today : this.plans[0].date;
    const renderPlans: RenderPlan[] = [];
    const groups: Plan[][] = this.groupPlansByDate(viewStartDate);

    groups.forEach(group => {
      group.forEach((plan, index) => {
        const start = this.daysDiff(plan.date, viewStartDate);
        const end = this.daysDiff(plan.endDate ?? plan.date, viewStartDate)
        const renderPlan = new RenderPlan(
          plan,
          this.daySize * (start + 1),
          this.daySize * (end + 1) + this.daySize,
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
      const rangeStart = this.daysDiff(plan.date, viewStartDate);
      const rangeEnd = this.daysDiff(plan.endDate ?? plan.date, viewStartDate);

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

  private daysDiff(date1: Date, date2: Date): number {
    const oneDay = 1000 * 60 * 60 * 24;
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.round(diff / oneDay);
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
