import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { RenderPlan } from '../../functions/render-plan';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanComponent {

  @Input() data!: RenderPlan;
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() details: EventEmitter<void> = new EventEmitter<void>();
  @Output() completed: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('style')
  get hostStyle() {
    return {
      top: `${this.data.start}px`,
      height: `${this.data.end - this.data.start}px`,
      left: `${this.data.offset}px`,
    }
  }

  onViewDetails() {
    this.details.emit();
  }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  onMarkAsCompleted() {
    this.completed.emit();
  }

}
