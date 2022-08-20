import { PlanComponent } from './plan.component';
import { fireEvent, getByTestId, getByText, render, screen } from '@testing-library/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RenderPlan } from '../../functions/render-plan';
import { EventType } from '../../../models/event-type';
import { EventTimeType } from '../../../models/event-time-type';
import { Priority } from '../../../models/priority';
import { Plan } from '../../../models/plan';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

describe('PlanComponent', () => {
  const mockPlan = (date: Date, endDate?: Date): Plan => ({
    id: 'fake-id',
    date,
    endDate,
    title: 'Plan',
    icon: 'smile',
    type: EventType.OneTime,
    timeType: EventTimeType.Point,
    priority: Priority.High,
    description: 'description',
    categories: [],
  });

  async function setup({ date, endDate }: { date: Date, endDate?: Date }) {
    const data = new RenderPlan(mockPlan(date, endDate), 50, 100, 50);
    const editPlan = jest.fn();
    const deletePlan = jest.fn();
    const viewDetails = jest.fn();
    const completePlan = jest.fn();

    const { fixture, container } = await render(PlanComponent, {
      componentProperties: {
        data,
        edit: { emit: editPlan } as any,
        delete: { emit: deletePlan } as any,
        details: { emit: viewDetails } as any,
        completed: { emit: completePlan } as any,
      },
      imports: [
        MatIconModule,
        MatMenuModule,
        EmojiModule,
      ],
    });

    return {
      fixture,
      element: fixture.nativeElement,
      container,
      component: fixture.componentInstance,
      editPlan,
      deletePlan,
      viewDetails,
      completePlan,
    }
  }

  it('displays plan data', async () => {
    const { element } = await setup({ date: new Date('2022-01-01') });

    const emoji = getByTestId(element, 'emoji');
    const title = getByText(element, 'Plan');
    const date = getByText(element, 'January 1');

    expect(emoji).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });

  it('displays end date when present', async () => {
    const { element } = await setup({ date: new Date(), endDate: new Date('2022-01-02') });

    const endDate = getByText(element, '- January 2');

    expect(endDate).toBeInTheDocument();
  });

  it('marks plan as completed', async () => {
    const { element, completePlan } = await setup({ date: new Date('2022-01-01') });

    const button = getByText(element, 'done');
    fireEvent.click(button);

    expect(completePlan).toHaveBeenCalled();
  });

  it('marks plan as completed through menu', async () => {
    const { element, completePlan } = await setup({ date: new Date('2022-01-01') });

    const menu = getByTestId(element, 'menu');
    fireEvent.click(menu);

    const button = screen.getByText('Mark as completed');
    fireEvent.click(button);

    expect(completePlan).toHaveBeenCalled();
  });

  it('views plan details through menu', async () => {
    const { element, viewDetails } = await setup({ date: new Date('2022-01-01') });

    const menu = getByTestId(element, 'menu');
    fireEvent.click(menu);

    const button = screen.getByText('View details');
    fireEvent.click(button);

    expect(viewDetails).toHaveBeenCalled();
  });

  it('edits plan through menu', async () => {
    const { element, editPlan } = await setup({ date: new Date('2022-01-01') });

    const menu = getByTestId(element, 'menu');
    fireEvent.click(menu);

    const button = screen.getByText('Edit plan');
    fireEvent.click(button);

    expect(editPlan).toHaveBeenCalled();
  });

  it('deletes plan through menu', async () => {
    const { element, deletePlan } = await setup({ date: new Date('2022-01-01') });

    const menu = getByTestId(element, 'menu');
    fireEvent.click(menu);

    const button = screen.getByText('Delete plan');
    fireEvent.click(button);

    expect(deletePlan).toHaveBeenCalled();
  });

  it('displays plan in correct position', async () => {
    const { element } = await setup({ date: new Date('2022-01-01') });

    expect(element.style.top).toBe('50px');
    expect(element.style.left).toBe('50px');
    expect(element.style.height).toBe('50px');
  });

});
