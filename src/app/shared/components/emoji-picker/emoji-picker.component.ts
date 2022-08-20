import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji/data/data.interfaces';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

type ChangeFn = (emoji: string) => void;
type TouchedFn = () => void;

@Component({
  selector: 'app-emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: EmojiPickerComponent
    }
  ]
})
export class EmojiPickerComponent implements ControlValueAccessor {

  @Input() emoji: string = '';
  @ViewChild('picker') picker!: TemplateRef<any>;

  touched: boolean = false;
  disabled: boolean = false;

  onChange!: ChangeFn;
  onTouched!: TouchedFn;

  private dialogRef: MatDialogRef<any> | undefined;

  constructor(
    private dialog: MatDialog,
  ) {
  }

  openPicker() {
    this.dialogRef = this.dialog.open(this.picker, {});
  }

  onEmojiSelect(event: any): void {
    if (this.disabled) {
      return;
    }

    const emoji = event.emoji as EmojiData;
    this.emoji = emoji.id;
    this.onChange(emoji.id);
    this.dialogRef!.close();

    this.touched = true;
    this.onTouched();
  }

  registerOnChange(fn: ChangeFn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.emoji = value;
  }

}
