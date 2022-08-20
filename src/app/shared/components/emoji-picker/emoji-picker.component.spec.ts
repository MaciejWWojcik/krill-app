import { EmojiPickerComponent } from './emoji-picker.component';
import { createSpyFromClass } from 'jest-auto-spies';
import { fireEvent, getByRole, getByTestId, render } from '@testing-library/angular';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { MatButtonModule } from '@angular/material/button';
import { fakeAsync } from '@angular/core/testing';
import { getNsPrefix } from '@angular/compiler';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji/data/data.interfaces';

describe('EmojiPickerComponent', () => {
  async function setup({ emoji = '', disabled = false } = {}) {
    const mockDialog = createSpyFromClass(MatDialog);

    const { fixture, container } = await render(EmojiPickerComponent, {
      componentProperties: {
        emoji,
        disabled,
      },
      imports: [
        MatButtonModule,
        MatIconModule,
        EmojiModule,
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
      ]
    });

    return {
      fixture,
      element: fixture.nativeElement,
      container,
      component: fixture.componentInstance,
      dialog: mockDialog,
    }
  }


  it('displays button with insert emoji icon on start', fakeAsync(async () => {
    const { element } = await setup();

    const button = getByRole(element, 'button');
    const icon = getByTestId(button, 'icon');

    expect(icon).toContainHTML('insert_emoticon');
  }));

  it('displays button with an actual emoji when selected', fakeAsync(async () => {
    const { element } = await setup({ emoji: ':smile:' });

    const button = getByRole(element, 'button');
    const emoji = getByTestId(button, 'emoji');

    expect(emoji).toContainHTML(':smile:');
  }));

  it('displays picker on click', fakeAsync(async () => {
    const { element, dialog, component } = await setup();

    const button = getByRole(element, 'button');
    fireEvent.click(button);

    expect(dialog.open).toHaveBeenCalledWith(component['picker'], {});
  }));

  it('does nothing when disabled on emoji select', fakeAsync(async () => {
    const { component } = await setup({ disabled: true });
    const emojiData = { id: 'fake-emoji' } as EmojiData;

    component['onEmojiSelect'](emojiData);

    expect(component.emoji).toEqual('');
  }));

  it('registers new value on emoji select', fakeAsync(async () => {
    const { component } = await setup();
    const emoji = { id: 'fake-emoji' } as EmojiData;
    const dialog = createSpyFromClass(MatDialogRef);

    component['onChange'] = jest.fn();
    component['onTouched'] = jest.fn();
    component['dialogRef'] = dialog;

    component['onEmojiSelect']({ emoji });

    expect(component.emoji).toEqual('fake-emoji');
    expect(component['onChange']).toHaveBeenCalledWith('fake-emoji');
    expect(dialog.close).toHaveBeenCalled();
    expect(component['touched']).toEqual(true);
    expect(component['onTouched']).toHaveBeenCalled();
  }));

  it('registers onChange callback', fakeAsync(async () => {
    const { component } = await setup();
    const callback = jest.fn();

    component['registerOnChange'](callback);
    component['onChange']('fake-event');

    expect(callback).toHaveBeenCalledWith('fake-event');
  }));

  it('registers onTouched callback', fakeAsync(async () => {
    const { component } = await setup();
    const callback = jest.fn();

    component['registerOnTouched'](callback);
    component['onTouched']();

    expect(callback).toHaveBeenCalled();
  }));

  it('disables state', fakeAsync(async () => {
    const { component } = await setup();

    component['setDisabledState'](true);
    expect(component.disabled).toEqual(true);

    component['setDisabledState'](false);
    expect(component.disabled).toEqual(false);
  }));

  it('writes value', fakeAsync(async () => {
    const { component } = await setup();

    component['writeValue']('fake-value');
    expect(component.emoji).toEqual('fake-value');
  }));

});
