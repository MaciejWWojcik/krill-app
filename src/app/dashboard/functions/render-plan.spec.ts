import { Plan } from '../../models/plan';
import { EventType } from '../../models/event-type';
import { EventTimeType } from '../../models/event-time-type';
import { Priority } from '../../models/priority';
import { RenderPlanManager } from './render-plan';

describe('RenderPlanManager', () => {
  const mockPlan = (id: string, date: Date, endDate?: Date): Plan => ({
    id,
    date,
    endDate,
    title: 'Plan 1',
    icon: 'icon',
    type: EventType.OneTime,
    timeType: EventTimeType.Point,
    priority: Priority.High,
    description: 'description',
    categories: [],
  });

  it('returns day view size', () => {
    const manager = new RenderPlanManager([mockPlan('1', new Date())], 36);
    expect(manager.dayViewSize).toBe(36);
  });

  it('returns start view as today if earlier than first plan', () => {
    const manager = new RenderPlanManager([mockPlan('1', new Date('2092-01-01'))]);
    expect(manager.startView.getFullYear()).toEqual(new Date().getFullYear());
    expect(manager.startView.getMonth()).toEqual(new Date().getMonth());
    expect(manager.startView.getDate()).toEqual(new Date().getDate());
  });

  it('returns start view as first plan date if earlier than first plan', () => {
    const manager = new RenderPlanManager([mockPlan('1', new Date('2000-01-01'))]);
    expect(manager.startView.getFullYear()).toEqual(new Date('2000-01-01').getFullYear());
    expect(manager.startView.getMonth()).toEqual(new Date('2000-01-01').getMonth());
    expect(manager.startView.getDate()).toEqual(new Date('2000-01-01').getDate());
  });

  it('returns end view as two months from today if later than last plan', () => {
    const manager = new RenderPlanManager([mockPlan('1', new Date('2000-01-01'))]);
    expect(manager.endView.getFullYear()).toEqual(new Date().getFullYear());
    expect(manager.endView.getMonth()).toEqual(new Date().getMonth() + 2);
  });

  it('returns end view as last plan date if later than two months from now', () => {
    const manager = new RenderPlanManager([mockPlan('1', new Date('2092-01-01'))]);
    expect(manager.endView.getFullYear()).toEqual(new Date('2092-01-01').getFullYear());
    expect(manager.endView.getMonth()).toEqual(new Date('2092-01-01').getMonth());
    expect(manager.endView.getDate()).toEqual(new Date('2092-01-01').getDate());
  });

  it('returns end view as last plan end date if later than two months from now', () => {
    const manager = new RenderPlanManager([mockPlan('1', new Date('2000-01-01'), new Date('2092-01-01'))]);
    expect(manager.endView.getFullYear()).toEqual(new Date('2092-01-01').getFullYear());
    expect(manager.endView.getMonth()).toEqual(new Date('2092-01-01').getMonth());
    expect(manager.endView.getDate()).toEqual(new Date('2092-01-01').getDate());
  });

  it('sort plans by date', () => {
    const manager = new RenderPlanManager([
      mockPlan('1', new Date('2001-01-01')),
      mockPlan('2', new Date('2000-01-01')),
    ]);
    expect(manager['plans'][0].id).toEqual('2');
    expect(manager['plans'][1].id).toEqual('1');
  });

  it('group plans by date', () => {
    const manager = new RenderPlanManager([
      mockPlan('1', new Date('2022-01-01'), new Date('2022-01-05')),
      mockPlan('2', new Date('2022-01-02')),
      mockPlan('3', new Date('2022-01-03'), new Date('2022-01-04')),
      mockPlan('4', new Date('2022-01-04')),
      mockPlan('5', new Date('2022-01-10')),
    ]);

    const groups = manager['groupPlansByDate'](new Date('2022-01-01'));

    expect(groups.length).toEqual(2);
    expect(groups[0].map(p => p.id)).toEqual(['1', '2', '3', '4']);
    expect(groups[1].map(p => p.id)).toEqual(['5']);
  });

  it('prepare plans for rendering', () => {
    const manager = new RenderPlanManager([
      mockPlan('1', new Date('2022-01-01'), new Date('2022-01-05')),
      mockPlan('2', new Date('2022-01-02')),
      mockPlan('3', new Date('2022-01-03'), new Date('2022-01-04')),
      mockPlan('4', new Date('2022-01-04')),
      mockPlan('5', new Date('2022-01-10')),
    ]);

    const plans = manager.toRender();

    expect(plans[0].plan.id).toEqual('1');
    expect(plans[0].start).toEqual(36 * 0);     // start on 0
    expect(plans[0].end).toEqual(36 * 4 + 36);  // has size of 4 days
    expect(plans[0].offset).toEqual(52 * 0);    // new group

    expect(plans[1].plan.id).toEqual('2');
    expect(plans[1].start).toEqual(36 * 1);     // start on 1
    expect(plans[1].end).toEqual(36 * 1 + 36);  // has size of 1 day
    expect(plans[1].offset).toEqual(52 * 1);    // 1 offset in group

    expect(plans[2].plan.id).toEqual('3');
    expect(plans[2].start).toEqual(36 * 2);     // start on 2
    expect(plans[2].end).toEqual(36 * 3 + 36);  // has size of 3 days
    expect(plans[2].offset).toEqual(52 * 2);    // 2 offsets in group

    expect(plans[3].plan.id).toEqual('4');
    expect(plans[3].start).toEqual(36 * 3);     // start on 3
    expect(plans[3].end).toEqual(36 * 3 + 36);  // has size of 1 day
    expect(plans[3].offset).toEqual(52 * 3);    // 3 offsets in group

    expect(plans[4].plan.id).toEqual('5');
    expect(plans[4].start).toEqual(36 * 9);     // start on 9
    expect(plans[4].end).toEqual(36 * 9 + 36);  // has size of 1 day
    expect(plans[4].offset).toEqual(52 * 0);    // new group
  });

});
